import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../Redux/Actions/userActions';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import axios from 'axios';

const RegisterScreen = (props) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [preference, setPreference] = useState('');
    const [allergies,setAlleregies] = useState('');
    const allergyOption = useRef();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error, success, } = userRegister;
    const dispatch = useDispatch();
    const [lengthchecking, setLengthChecking] = useState(false);
    const [repasschecking, setRepassChecking] = useState(false);

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/shop';
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/tags/allergy`)
        .then((result)=>{
            let things = result.data.map(x=> Object.assign({value:x},{label:x}));
            allergyOption.current = things;
        });
        if (userInfo || success) {
            props.history.push(redirect);
        }
        return () => {
            // cleanup
        };
    }, [success]);

    const getPreferences = () => {
        return axios.get(`${process.env.REACT_APP_API_SERVER}/api/tags/category`)
        .then((result)=>{
            let things = result.data.map(x=> Object.assign({value:x},{label:x}));
            return things;
        });
    };

    const getAllergy = () => new Promise(resolve => {
        setTimeout(() => {
            resolve(allergyOption.current);
        }, 1000);
    });

    const submitHandler = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setLengthChecking(true);
        } else if (password != rePassword ) {
            setRepassChecking(true);
        }
        else{
            setLengthChecking(false);
            setRepassChecking(false);
            dispatch(register(name, email, password,preference,allergies));
        }
    }

    return (
        <div className="register-screen">
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create ACCOUNT!</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>Oops! Action failed. Maybe email is occupied?</div>}
                        {success && <div>Profile Created Success</div>}
                        {lengthchecking && <div>Password needs to be more than 8 character</div>}
                        {repasschecking && <div>Password does not match, please retype</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name 
                        </label>
                        <input type="name" name="name" id="name" onChange={(e)=>setName(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email 
                        </label>
                        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
                        </input> 
                    </li>
                    <li>
                        <label htmlFor="rePassword">
                            Re enter-Password
                        </label>
                        <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                        </input> 
                    </li>
                    <div className="Preference">
                    <li>
                            <h2>Preference And Allegeries</h2>
                        </li>
                        <li>
                            <label htmlFor="preference">
                                Preference
                        </label>
                        <AsyncSelect
                        isMulti cacheOptions defaultOptions
                        name="preference" id="preference"
                        loadOptions={getPreferences}
                        placeholder={'You Can Leave It Blank...'}
                        onChange={(e) => {e? setPreference(e.map(e=>e.value)) : setPreference(e)}} />
                            {/* <input value={preference} type="preference" name="preference" id="preference" onChange={(e) => setPreference(e.target.value)}>
                            </input> */}
                        </li>
                        <li>
                            <label htmlFor="allergies">
                                Allergies
                        </label>
                        <AsyncCreatableSelect
                        isMulti cacheOptions defaultOptions
                        name="allergies" id="allergies"
                        loadOptions={getAllergy}
                        placeholder={'Type to Generate New Record...'}
                        onChange={(e) => {e? setAlleregies(e.map(e=>e.value)) : setAlleregies(e)}} />
                            {/* <input value={allergies} type="allergies" name="allergies" id="allergies" onChange={(e) => setAlleregies(e.target.value)}>
                            </input> */}
                        </li></div>
                <li>
                    
                        <button type="submit" className="button primary">Register</button>
                    </li>
                    <li>
                        Already have an account?
                        <Link to={redirect === "/" ? "signin" : "signin?redirect="+ redirect} className="button secondary text-center">Back to Signin</Link>
                   
                    </li>
          
                </ul>

            </form>
        </div>
        </div>
    )}
export default RegisterScreen;