import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import  { reset_validate, reset } from '../Redux/Actions/userActions' 

function ResetScreen(props) {
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const dispatch = useDispatch();
    const [lengthchecking, setLengthChecking] = useState(false);
    const [repasschecking, setRepassChecking] = useState(false);

    const userResetValidate = useSelector(state => state.userResetValidate);
    const { loading, userInfo, error } = userResetValidate;
    const userReset = useSelector(state => state.userReset);
    const { loading: loadingReset, success, error: errorReset } = userReset;
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
            dispatch(reset({ userId: userInfo._id, password, token: props.match.params.id }));
        }
    }

    useEffect(() => {
        dispatch(reset_validate(props.match.params.id));
        if (success) {
            props.history.push('/signin#congras');
        }
        return () => {
            // cleanup
        }
    },[success])

    return <>{
        userInfo ? 
        <div className="verify-sms">
        <form onSubmit={submitHandler}>
        <ul className="form-container">
            <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {loadingReset && <div>Loading...</div>}
                {errorReset && <div>{errorReset}</div>}
                {userInfo && <div>You can Reset Your Password Now.</div>}
                {lengthchecking && <div>Password needs to be more than 8 character</div>}
                {repasschecking && <div>Password does not match, please retype</div>}
            </li>
            <li>
                <label for="password">
                    Password
                </label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
                </input> 
            </li>
            <li>
                <label for="rePassword">
                    Re enter-Password
                </label>
                <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                </input> 
            </li>
            <li>
                <button type="submit" className="button primary">Reset Password</button>
            </li>
        </ul>
        </form>
        </div>
        : 
        <div className="verify-phone">
        <ul className="form-container">
            <li>
                <label>Request Invalid. Anything wrong?</label>
                <Link to="/forgot">
                    Forgot Password?
                </Link>
            </li>
        </ul>
        </div>
    }</>

}
export default ResetScreen;