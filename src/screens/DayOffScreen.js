import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { saveDayOff, listDayOff, } from "../Redux/Actions/dayOffActions";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DayOffScreen(props) {
    const dispatch = useDispatch();

    const dayOffCreate = useSelector(state => state.dayOffCreate);
    const { loading, success, error } = dayOffCreate;
    const dayOffList = useSelector(state => state.dayOffList);
    const { bulkDate, loading: loadingList, success: successList, error: errorList } = dayOffList;
    const [newDate, setNewDate] = useState([]);

    useEffect(() => {
        dispatch(listDayOff());
        return () => {};
    },[success]);

    useEffect(() => {
        setNewDate(bulkDate.map(x=>new Date(x)));
        return () => {};
    },[successList]);

    const addEntry = () => {
        setNewDate(oldArray => [...oldArray, '']);
    };

    const putDate = (index, date) => {
        newDate.splice(index, 1, new Date(date));
        setNewDate([...newDate]);
    };

    const submitDateHandler = (e) => {
        e.preventDefault();
        dispatch(saveDayOff(newDate));
        // console.log(bulkDate, newDate);
    };

    const removeHandler = (e, index) => {
        e.preventDefault();
        newDate.splice(index, 1);
        setNewDate([...newDate]);
    };

    return <div>
        { errorList ?
        <h4 className="content-margined">{errorList}</h4>:
        <div className="content-margined">
        <div className="product-header">
            <h1>Day Offs</h1>
            <button className="btn" onClick={()=>addEntry()}>Create New Day Off</button>
            {loading && <h4>Saving...</h4>}
            {error && <h4>Save Fail</h4>}
            {loadingList && <h4>Loading...</h4>}
        </div>
        <form onSubmit={submitDateHandler}>
        <div className="product-list_div__Content">
            <table className="table">
                <thead>
                    <tr>
                        <th>Day Off</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {newDate[0] !== null ? 
                    newDate.map((x,index) => (<tr key={index}>
                        <td>
                        <DatePicker
                            name={index}
                            selected={x}
                            onChange={date => {
                                date.setHours(12,0,0);
                                putDate(index, date);
                            }}
                            autoComplete="off"
                            placeholderText="Date Required"
                        />
                        </td>
                        <td>
                        <button onClick={(e)=>removeHandler(e, index)}>Delete</button>
                        </td>
                    </tr>
                    )):<tr/>}
                </tbody>
            </table>
        </div>
        <div className="product-header">
            <button type="submit" className="btn">Submit</button>
        </div>
        </form>
        </div>
        }
        </div>;
}

export default DayOffScreen;