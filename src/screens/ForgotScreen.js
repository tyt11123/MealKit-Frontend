import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import {forgot} from '../Redux/Actions/userActions' ;

function ForgotScreen(props) {
    const[email,setEmail] = useState('');
    const dispatch = useDispatch();

    const userForgot = useSelector(state => state.userForgot);
    const { loading, error, success } = userForgot;
    const submitForgotHandler = (e) => {
        e.preventDefault();
        dispatch(forgot(email));
    };

    return <>
        <div className="forgot_verify-phone">
        <form onSubmit={submitForgotHandler}>
        <ul className="form-container">
            <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                { (success === 200) && <div>An Email has been Sent to the Specified Address. Please follow the instruction inside.</div>}
                { (success === 202) && <div>Specified Entry not found in Our Database.</div>}
            </li>
            <li>
                <label htmlFor="email">
                    Enter Your Registered Email for Next Step 
                </label>
                <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}></input>
            </li>
            <li>
                <button type="submit" className="button primary">Submit</button>
            </li>
        </ul>
        </form>
        </div>
    </>

}
export default ForgotScreen;