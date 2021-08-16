import React from 'react';
import axios from 'axios';
import Select from 'react-select';

class AreaSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectOptions: [],
            area: ''
        }
    }
    selectRef = null;
  
    async getOptions(str) {
        const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/shippings/area?region=${str}`);
    
        const options = res.data.map(d => ({
            "label": d
        }))
        this.setState({ selectOptions: options })
    }

    componentDidMount() {
       
        this.getOptions(this.props.region);
    }
    componentDidUpdate(prevProps) {
        if(this.props.region !== prevProps.region){
        this.getOptions(this.props.region);
        this.selectRef.select.clearValue();
        }
    }

    // handleChange(e) {
    //      this.setState({id:e.value, area:e.label})
    // }


    render() {
        // console.log(this.state.selectOptions)
        return (
            
            <div className="selectmenu"> 
                 <Select ref={ref => { this.selectRef = ref; }}
                 options={this.state.selectOptions} onChange={this.props.handleChange} />
            </div>
        )
    }
}

export default AreaSelect