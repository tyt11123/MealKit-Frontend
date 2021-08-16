import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const TimeSelect = (props) => {
    const [selectOptions, setSelectOptions] = useState([]);
    const [area, setArea] = useState('');
    const [selectRef, setSelectRef] = useState(null);
    selectRef = null;

    useEffect(() => {
        getOptions();
        return () => {
            // cleanup
        };
    }, []);
  
    const getOptions = () => {
        let cutoff = new Date();
        cutoff.setHours(17,0,0,0);
        let current = new Date();
        let offset = 0;
        if (cutoff < current) {
            offset = 1;
        }
        let x = [];
        for (let i = 0; i < 10; i++) {
            x.push(new Date());
            x[i].setDate(x[i].getDate() + i + offset);
        };
        let days = [];
        for (let i = 0; i < 10; i++) {
            if (!((x[i].getDay === 0)||(x[i].getDay === 6))) {
                days.push(x[i]);
            }
        };
        const options = days.map(d => ({
            "label": d.toLocaleDateString()
        }))
        setSelectOptions( options );
    };

    return (
        <div className="selectmenu"> 
            <Select ref={ref => { setSelectRef( ref ); }}
            options={selectOptions} onChange={this.props.handleChange} />
        </div>
    );
}

export default TimeSelect;