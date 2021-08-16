import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signin, facebook } from '../Redux/Actions/userActions';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import logo from '../fb.svg';

const SigninScreen = (props) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/shop';

    useEffect(() => {
        if (userInfo) {
            props.history.replace(redirect);
       }
        return () => {
            // cleanup
        };
    }, [userInfo])

    const componentClick = () => {
        return null;
    }

    const responseFacebook = (userInfo) => {
        if(userInfo.accessToken){
            dispatch(facebook(userInfo.accessToken));
        }
        return null;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return (
        <div className="form signin-screen">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {props.location.hash && <div>Done! You can Login now.</div>}
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
                        <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                        <Link to="/forgot">Forgot Password?</Link>
                    </li>
                    <li>
                        New to mealKit 
                    </li>
                    <li>
                        <Link to={redirect === "/shop" ? "register" : "register?redirect="+ redirect} className="btn btn-primary text-center signInBtn">Create account now!</Link>
                    </li>
                    <li>OR</li>
                    <li>
                        <FacebookLogin  
                        appId ={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
                        autoLoad={false}
                        callback={responseFacebook}
                        render={renderProps => (
                            <div onClick={renderProps.onClick} className="fb button">
                                <img src={logo} alt="logo" />
                                &nbsp;&nbsp;Login with Facebook
                            </div>
                          )}
                        />
                    </li>
                </ul>
            </form>
        </div>
    )}
export default SigninScreen;