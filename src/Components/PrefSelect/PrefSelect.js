import React, {useState} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import './PrefSelect.css';



const optionPref = [
    { value: 'spicy', label: 'spicy' },
    { value: 'salty', label: 'salty' },
    { value: 'sour', label: 'sour' }
];

const optionallerg = [
  { value: 'milk', label: 'milk' },
  { value: 'nuts', label: 'nuts' },
  { value: 'pepper', label: 'pepper' }
]

const PrefSelect = (props) => {
    const [allerg, setAlleg] = useState([]);
    const [pref, setPref] = useState({});

    const customTheme=(theme) =>{
        return {
          ...theme,
          colors: {
            ...theme.colors,
            primary25: 'orange',
            primary:'green'
          }
        }
    }




    return (
        <div className="pref-select">
            <Select components={makeAnimated()} theme={customTheme} options={optionallerg} onChange={setAlleg} className="mb-3" placeHolder="Select Allergy Ingredient" Searchable isMulti autoFocus/>
            <Select theme={customTheme} options={optionPref} onChange={setPref} className="mb-3" placeHolder="Select Eatting Preference" isSearchable/> </div>
    )


}




export default PrefSelect;
