import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

import { useDispatch, useSelector } from 'react-redux';

import {logout, update, generate, verify, restart} from '../Redux/Actions/userActions' ;
import { welcomeCoupon, } from '../Redux/Actions/CouponActions';

function PhoneScreen(props) {
    const[name,setName] = useState('');
    const[password,setPassword] = useState('');
    const[email,setEmail] = useState('');
    const[phone, setPhone] = useState('');
    const[localphone, setLocalPhone] = useState('');
    const[smscode, setSMSCode] = useState('');
    const[facebookid,setFacebookid] = useState('');
    const[valid, setValid] = useState(false);
    const[placeholder, setPlaceholder] = useState('');
    const[blank, setBlank] = useState(false);   // check if userInfo.phone used to be blank, for coupon
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const handleLogOut = () => {
        dispatch(logout());
        props.history.push("/signin")
    };
    const checkPhone = (valid,a,b,num) => {
        setValid(valid);
        if (valid) {
            setLocalPhone(a);
            setPhone(num.replace(/\s/g, ""));
        };
    };
    const submitPhoneHandler = (e) => {
        e.preventDefault();
        dispatch(generate(phone));
    };
    const submitSMSHandler = (e) => {
        e.preventDefault();
        dispatch(verify(phone, smscode, localphone));
    };
    const startOverHandler = () => {
        dispatch(restart());
    };

    const userSMS = useSelector(state => state.userSMS);
    const { loading, status, error, success } = userSMS;

    const couponWelcome = useSelector(state => state.couponWelcome);
    const { loading: loadingCoupon, success: successCoupon, error: errorCoupon, } = couponWelcome;

    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
            setFacebookid(userInfo.facebook_id);
            setPhone(userInfo.phone);
            setPlaceholder(userInfo.phone);
            userInfo.phone ? setBlank(false) : setBlank(true);
            setValid(false);
        }
        return () => {
            
        }
    },[])

    useEffect(() => {
        if (userInfo) {
            setPlaceholder(userInfo.phone);
            setValid(false);
            if (blank) {dispatch(welcomeCoupon()); setBlank(false);};
        }
        return () => {
            
        }
    },[success])

    return <>{
        status ? 
        <div className="verify-sms">
        <form onSubmit={submitSMSHandler}>
        <ul className="form-container">
            <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
            </li>
            <li>
            <label htmlFor="sms">
                An SMS would be sent to {phone}
            </label>
            <input
            placeholder="SMS code"
            type="text"
            name="sms"
            onChange={(e) => setSMSCode(e.target.value)}/>
            </li>
            <li>
                { smscode ?
                <button type="submit" className="button primary">Verify</button>
                :
                <button type="submit" disabled className="button primary">Verify</button>}
            </li>
            <li>
            <Link to={"#"} onClick={startOverHandler}>Problem? Start over again.</Link>
            </li>
        </ul>
        </form>
        </div>
        : 
        <div className="verify-phone">
        <form onSubmit={submitPhoneHandler}>
        <ul className="form-container">
            <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                { (success === 200) && <div>Phone number verfied</div>}
                { (success === 202) && <div>The phone number is already occupied in our database. Please contact our customer service representative for manual verification.</div>}
                {successCoupon && <div>Congratulations! A Coupon is ready for your full registration. Please check your email.</div>}
                {placeholder?
                <div>Your current registered phone is {placeholder}</div>:
                <div>You have not registered a number yet.</div>}
            </li>
            <li>
            <label htmlFor="phone">
                Enter Your Phone Number for SMS Verification
            </label>
            <IntlTelInput
            name="phone"
            defaultCountry="hk"
            onlyCountries={["hk"]}
            preferredCountries={["hk"]}
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            placeholder={placeholder}
            onPhoneNumberFocus={(valid,a,b,num)=>checkPhone(valid,a,b,num)}
            onPhoneNumberChange={(valid,a,b,num)=>checkPhone(valid,a,b,num)}
            onPhoneNumberBlur={(valid,a,b,num)=>checkPhone(valid,a,b,num)}
            />
            </li>
            <li>
                {valid && !(success) ?
                <button type="submit" className="button primary">Submit</button>
                :
                <button type="submit" disabled className="button primary">Submit</button>}
            </li>
        </ul>
        </form>
        </div>
    }</>

}
export default PhoneScreen;