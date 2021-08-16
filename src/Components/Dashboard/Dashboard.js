import React, { useState, useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'react-apexcharts';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/Spinner';
import './Dashboard.css';
import SelectList from 'react-widgets/lib/SelectList';
import Modal from "react-modal";
import { listChart, detailsChart, } from '../../Redux/Actions/dashboardActions';

Modal.setAppElement("#root");

const Dashboard = (props) => {
    const dashboardList = useSelector(state => state.dashboardList);
    const { loading, error, dashboardOption } = dashboardList;
    const dashboardDetails = useSelector(state => state.dashboardDetails);
    const { loading: loadingDetails, error: errorDetails, chart } = dashboardDetails;
    const dispatch = useDispatch();

    const options = {
        chart: {
            background: "#f4f4f4",
            foreColor: "#333",
        },
        xaxis: {
            categories: [
                "New York",
                "Los Angeles",
                "Chicago",
                "Houston",
                "Philadelphia",
                "Phoenix",
                "San Antonio",
                "San Diego",
                "Dallas",
                "San Jose"
            ]
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        fill: {
            colors: ["#F44336"]
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: "DEMO - TITLELargest US Cities By Population",
            align: "center",
            margin: 20,
            offsetY: 20,
            style: {
                fontSize: "25px"
            }
        },
    };
    const series = [
        {
            name: "Population",
            data: [
                8550405,
                3971883,
                2720546,
                2296224,
                1567442,
                1563025,
                1469845,
                1394928,
                1300092,
                1026908
            ]
        }
    ];
    const [optionsList, setOptionsList] = useState([]);
    const [seriesList, setSeriesList] = useState([]);
    const [countOfRequiredCharts, setCountOfRequiredCharts] = useState(0);
    const [countOfLoadedCharts, setCountOfLoadedCharts] = useState(0);
    const [chartOption, setChartOption] = useState([]);
    const [chartsSelected, setChartsSelected] = useState([]);
    const [optionsSelected, setOptionsSelected] = useState([]);
    const [seriesSelected, setSeriesSelected] = useState([]);
    const [modal, setModal] = useState(false);
    const [bootstrapColumn, setBootstrapColumn] = useState("col-12");
    
    const toggleModal = () => {
      if (modal) {
        setModal(false);
      } else {
        setModal(true);
      }
    };

    const onClick = () => {
        let optionsContainer = [];
        for (let i = 0; i < optionsList.length; i++) {
            optionsContainer.push({
                ...optionsList[i],
                plotOptions: {
                    ...optionsList[i].plotOptions,
                    bar: {
                        ...optionsList[i].plotOptions.bar,
                        horizontal: !optionsList[i].plotOptions.bar.horizontal
                    }
                }
            })
        };
        setOptionsList([...optionsContainer]);
    };

    // Load a List of Charts to redux store 'dashboardList' at the beginning
    useEffect(() => {
        dispatch(listChart());
        return () => {};
    }, []);

    // setCountOfRequiredCharts to the length of chartOption whenever it changes
    // setChartOption and setChartSelected to dashboardOption after it is loaded
    useEffect(() => {
        if (dashboardOption && dashboardOption[0]) {
            setCountOfRequiredCharts(dashboardOption.length);
            setChartOption(
                dashboardOption.map((option, index) => Object.assign({...option, index}))
            );
            setChartsSelected(
                dashboardOption.map((option, index) => Object.assign({...option, index}))
            );
        };
        return () => {};
    }, [dashboardOption]);

    // Load the details of different charts one by one, to redux store 'dashboardDetails'
    useEffect(() => {
        if (countOfRequiredCharts > 0) {
            if (countOfLoadedCharts < countOfRequiredCharts) {
                dispatch(detailsChart(chartOption[countOfLoadedCharts].value));
            };
            // initialize optionsSelected and seriesSelected after optionsList and seriesList loads completely
            if (countOfLoadedCharts === countOfRequiredCharts) {
                setOptionsSelected(optionsList);
                setSeriesSelected(seriesList);
            };
        };
        return () => {};
    }, [countOfRequiredCharts, countOfLoadedCharts]);

    // Push the chart details to arrays (both state variables), and setCountOfLoadedCharts to increase 1
    useEffect(() => {
        if (chart && chart.optionsFromBackend) {
            // Convert string to "Wed Oct 28" if it is in "2020-10-28T16:00:00.000Z" format
            chart.optionsFromBackend.xaxis.categories = chart.optionsFromBackend.xaxis.categories.map(x=>new Date(x).getFullYear() > 1970 ? new Date(x).toDateString().slice(0,10) : x);
            optionsList.push({...options, ...chart.optionsFromBackend});
            setOptionsList([...optionsList]);
        };
        if (chart && chart.seriesFromBackend) {
            seriesList.push(chart.seriesFromBackend);
            setSeriesList([...seriesList]);
            // setCountOfLoadedCharts: increase by 1
            setCountOfLoadedCharts(countOfLoadedCharts + 1);
        };
        return () => {};
    }, [chart]);

    // When user changes chartsSelected in the Modal, reload optionsSelected and seriesSelected
    useEffect(() => {
        // The checking can only be done if optionsList and seriesList are loaded completely, or error will occur
        if ( (countOfRequiredCharts > 0) && (countOfRequiredCharts == countOfLoadedCharts) ) {
            let optionsContainer = [];
            let seriesContainer = [];
            for (let i = 0; i < chartsSelected.length; i++) {
                optionsContainer.push(optionsList[chartsSelected[i].index]);
                seriesContainer.push(seriesList[chartsSelected[i].index]);
            };
            setOptionsSelected([...optionsContainer]);
            setSeriesSelected([...seriesContainer]);
        };
        return () => {};
    }, [chartsSelected]);

    // When user changes optionsList in the Modal, reload optionsSelected
    useEffect(() => {
        // The checking can only be done if optionsList and seriesList are loaded completely, or error will occur
        if ( (countOfRequiredCharts > 0) && (countOfRequiredCharts == countOfLoadedCharts) ) {
            let optionsContainer = [];
            for (let i = 0; i < chartsSelected.length; i++) {
                optionsContainer.push(optionsList[chartsSelected[i].index]);
            };
            setOptionsSelected([...optionsContainer]);
        };
        return () => {};
    }, [optionsList]);

    return (
        <div className="dashboard_outta">
            <div className="dashboard_container">
            <React.Fragment>
                { (countOfRequiredCharts > 0) && (countOfRequiredCharts == countOfLoadedCharts) ? (
                    <div className="dashboard_setting">
                        <Button onClick={toggleModal}>Settings</Button>
                        <Modal
                            isOpen={modal}
                            onRequestClose={toggleModal}
                            contentLabel="Settings"
                            className="mymodal"
                            overlayClassName="myoverlay"
                            closeTimeoutMS={500}
                        >
                            <Button onClick={onClick}>Change axis</Button>&nbsp;
                            <Button onClick={()=>setBootstrapColumn('col-12')}>Show 1 Table in a Row</Button>&nbsp;
                            <Button onClick={()=>setBootstrapColumn('col-6')}>Show 2 Tables in a Row</Button>&nbsp;
                            <p></p>
                            {chartOption ? (
                            <div>
                                <SelectList
                                multiple
                                data={chartOption}
                                value={chartsSelected}
                                textField="text"
                                onChange={(e) => setChartsSelected(e)}
                                />
                                <Button onClick={(e)=>{setChartsSelected(chartOption);}}>
                                    Show Every Table
                                </Button>&nbsp;
                                <Button onClick={(e)=>{setChartsSelected([]);}}>
                                    Hide All Table
                                </Button>&nbsp;
                            </div>
                            ) : (
                            <SelectList busy />
                            )}
                        </Modal>
                    </div>
                ) : (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}
                { (countOfRequiredCharts > 0) && (countOfRequiredCharts == countOfLoadedCharts) &&
                    <div className="row">
                    {optionsSelected.map(
                        (dummy, index) =>
                        <div key={index} className={bootstrapColumn}>
                            <Chart
                                options={optionsSelected[index]}
                                series={seriesSelected[index]}
                                type={optionsSelected[index].type || "bar"}
                                height="450"
                                width="100%" />
                        </div>
                    )}
                    </div>
                }
            </React.Fragment>
            </div>
        </div>
    );
}

export default Dashboard;