import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../Redux/Actions/OrderActions'

import { logout, update } from '../Redux/Actions/userActions'

import Tagsinput from "../Components/Tagsinput/Tagsinput";
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import axios from 'axios';

function ProfileScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('')
    const [preference, setPreference] = useState('');
    const [allergies, setAllergies] = useState('');
    const allergyOption = useRef();
    const [tags, setTags] = useState('');
    const [facebookid, setFacebookid] = useState('');
    const dispatch = useDispatch();
    const [lengthchecking, setLengthChecking] = useState(false);
    const [repasschecking, setRepassChecking] = useState(false);


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const handleLogOut = () => {
        dispatch(logout());
        props.history.push("/signin")
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (password) {
            if (password.length < 8) {
                setLengthChecking(true);
            } else if (password !== rePassword) {
                setRepassChecking(true);
            }
            else {
                setLengthChecking(false);
                setRepassChecking(false);
                dispatch(update({ userId: userInfo._id, email, name, password, preference, allergies, tags }))
            }
        } else {
            dispatch(update({ userId: userInfo._id, email, name, password, preference, allergies, tags }))
        };
    }

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate


    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/tags/allergy`)
        .then((result)=>{
            let things = result.data.map(x=> Object.assign({value:x},{label:x}));
            allergyOption.current = things;
        });
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
            setFacebookid(userInfo.facebook_id);
            setPreference(userInfo.preference);
            setAllergies(userInfo.allergies);
        } else {
            props.history.push("/signin?redirect=profile")
        }
        dispatch(listMyOrders());
        return () => {

        }
    }, [userInfo]);

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

    if (orders) {
        for (let i = 0; i < orders.length; i++) {
            orders[i].createdAt = new Date(orders[i].createdAt).toLocaleString();
            if (orders[i].isPaid) {orders[i].paidAt = new Date(orders[i].paidAt).toLocaleString();};
            if (orders[i].isDelivered) {orders[i].deliveredAt = new Date(orders[i].deliveredAt).toLocaleString();};
        };
   };

    return <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                        {userInfo && userInfo.isAdmin && (
                            <div>
                            <div>Admin:</div>
                            <div>
                            <NavLink to="/orders">Orders</NavLink>&nbsp;
                            <NavLink to="/products">Products</NavLink>&nbsp;
                            <NavLink to="/bundle">Bundle</NavLink>&nbsp;
                            <NavLink to="/coupon">Coupon</NavLink>&nbsp;
                            </div>
                            <div>
                            <NavLink to="/publish">Dispatch</NavLink>&nbsp;
                            <NavLink to="/carousel">Carousel</NavLink>&nbsp;
                            <NavLink to="/dayoff">DayOff</NavLink>&nbsp;
                            <NavLink to="/dashboard">Dashboard</NavLink>&nbsp;
                            </div>
                            <div>
                            <NavLink to="/courier">Delivery</NavLink>&nbsp;
                            </div>
                            </div>
                        )}
                        </li>
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name
                        </label>
                            {facebookid ? <input value={name} readOnly /> :
                                <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                            }
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                        </label>
                            {facebookid ? <input value={email} readOnly /> :
                                <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                            }
                        </li>
                        {facebookid ? <li /> :
                            <li>
                                <label htmlFor="password">
                                    Password
                        </label>
                                <input value={password} type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
                                </input>
                                <label htmlFor="password">
                                   Re-Enter Password
                        </label>
                                <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}/>
                            </li>
                           
                        }
                        <div className="Preference">
                            <li>
                                <h2>Preference And Allegeries</h2>
                            </li>
                            <li>
                                <label htmlFor="preference">
                                    Preference
                                 </label>
                                {/* <input value={preference} type="preference" name="preference" id="preference" onChange={(e) => setPreference(e.target.value)}>
                                </input> */}
                                <AsyncSelect
                                defaultValue={userInfo && userInfo.preference?userInfo.preference.map(x=>Object.assign({value:x,label:x})):[]}
                                isMulti cacheOptions defaultOptions
                                name="preference" id="preference"
                                loadOptions={getPreferences}
                                onChange={(e) => {e? setPreference(e.map(e=>e.value)) : setPreference(e)}} />
                            </li>
                            <li>
                                <label htmlFor="allergies">
                                    Allergies
                                </label>
                                <AsyncCreatableSelect
                                isMulti cacheOptions defaultOptions
                                name="allergies" id="allergies"
                                defaultValue={userInfo && userInfo.allergies?userInfo.allergies.map(x=>Object.assign({value:x,label:x})):[]}
                                loadOptions={getAllergy}
                                placeholder={'Type to Generate New Record...'}
                                onChange={(e) => {e? setAllergies(e.map(e=>e.value)): setAllergies(e)}} />
                                {/* <input value={allergies} type="allergies" name="allergies" id="allergies" onChange={(e) => setAlleregies(e.target.value)}>
                                </input> */}
                            </li>
                        </div>

                        <div>
                            <li>
                                <NavLink to="/verify">Click here to Check / Add Your Mobile Phone</NavLink>
                            </li>
                            <div className="preference"></div>
                            {facebookid ? <li>You are currently logged in as a Facebook User</li> : <li />}
                            <li>
                                {loading && <div>Loading...</div>}
                                {error && <div>{error}</div>}
                                {success && <div>Updated. Please logout and login again to apply new setting.</div>}
                                {lengthchecking && <div>Password needs to be more than 8 character</div>}
                            {repasschecking && <div>Password does not match, please retype</div>}
                            </li>
                            {success ?
                                <button disabled type="submit" className="button primary">Update</button>
                                : <button type="submit" className="button primary">Update</button>
                            }
                        </div>
                        <li>
                            <button type="button" onClick={handleLogOut} className="button full-width">LogOut</button>
                        </li>

                    </ul>

                </form>
            </div>
        </div>
        <div className="profile-orders content-margin">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders}</div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>ACTIONS</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orders ? orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid? "Paid": "Not Paid"}</td>
                                    <td><Link to={"/order/" + order._id}>DETAILS</Link></td>
                                </tr>) : <tr />}
                            </tbody>
                        </table>
            }
        </div>
    </div>


}
export default ProfileScreen;
