import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../Redux/Actions/CartActions';
import MemberCheckoutSteps from '../Components/MemberCheckoutSteps';
import { createShipping, listShippings, deleteShipping } from '../Redux/Actions/shippingActions';
// import AreaSelect from '../Components/AreaSelect/AreaSelect';
import axios from 'axios';
import 'react-widgets/dist/css/react-widgets.css';
import DropdownList from 'react-widgets/lib/DropdownList';

import "./MemberShippingScreen.css";

const MemberShippingScreen = (props) => {
     
    const [address, setAddress] = useState('');    
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('HK');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [shippingID, setShippingID] = useState('');
    const [a, setA] = useState('');  // a stores the new address
    const [b, setB] = useState('');  // b stores the new area
    const [c, setC] = useState('');  // c stores the new city
    const [d, setD] = useState('HK');  // d stores the new country
    const [x, setX] = useState('');  // x stores the new latitude
    const [y, setY] = useState('');  // y stores the new longitude
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cityOption, setCityOption] = useState([]);
    const [loadingCity, setLoadingCity] = useState(false);
    const [errorSearch, setErrorSearch] = useState('');

    const shippingCreate = useSelector(state => state.shippingCreate);
    const { loading, success, error, shipping } = shippingCreate;

    const shippingList = useSelector(state => state.shippingList);
    const { loading: loadingGet, shipping: shippingGet, error: errorGet } = shippingList;

    const shippingDelete = useSelector(state => state.shippingDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = shippingDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listShippings());
        return () => {
            // cleanup
        };
    }, [success, successDelete]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({_id: shippingID, address, area, city, country, latitude, longitude,}));
        props.history.push('memberPayment');
    }

    const placeShippingHandler = (e) => {
        e.preventDefault();
        dispatch(createShipping({address: a, area: b, city: c, country: d, latitude: x, longitude: y,}));
    }

    const deleteHandler = (e, shipping) => {
        e.preventDefault();
        setShippingID('');
        dispatch(deleteShipping(shipping._id));
    }

    function flattenObject(ob) {
        var toReturn = {};
        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) continue;
    
            if ((typeof ob[i]) == 'object' && ob[i] !== null) {
                var flatObject = flattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;
    
                    toReturn[i + '.' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    }

    const searchAPIHandler = (e) => {
        e.preventDefault();
        setLoadingCity(true);
        axios
        .get(`https://www.als.ogcio.gov.hk/lookup?q=${searchKeyword}`, {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en,zh-Hant',
          },
        })
        .then((response) => {
          let temp1 = response.data.SuggestedAddress;
          let temp2 = [];
          for (let i = 0; i < temp1.length; i++) {
          if (temp1[i].Address.PremisesAddress.EngPremisesAddress.EngStreet)
          {let temp3 = temp1[i].Address.PremisesAddress.EngPremisesAddress.EngStreet;
          temp1[i].Address.PremisesAddress.EngPremisesAddress.EngStreet = Object.values(temp3).join('-');}
          if (temp1[i].Address.PremisesAddress.EngPremisesAddress.EngBlock)
          {delete temp1[i].Address.PremisesAddress.EngPremisesAddress.EngBlock.BlockDescriptorPrecedenceIndicator;}
          if (temp1[i].Address.PremisesAddress.ChiPremisesAddress.ChiStreet)
          {let temp4 = temp1[i].Address.PremisesAddress.ChiPremisesAddress.ChiStreet;
          temp1[i].Address.PremisesAddress.ChiPremisesAddress.ChiStreet = Object.values(temp4).join('-');}
          let temp5 = [...Object.values(flattenObject(temp1[i].Address.PremisesAddress.EngPremisesAddress)),
          ...Object.values(flattenObject(temp1[i].Address.PremisesAddress.ChiPremisesAddress))].join(', ');
          let temp6 = temp1[i].Address.PremisesAddress.EngPremisesAddress.Region;
          let stanley = /stanley/i;
          let tai_tam = /tai tam/i;
          let southern_district = /SOUTHERN\sDISTRICT/i;
          if ((temp5.search(stanley) > -1) && (temp5.search(southern_district) > -1)) {temp6 += ' (Stanley)';}
          if ((temp5.search(tai_tam) > -1) && (temp5.search(southern_district) > -1)) {temp6 += ' (Tai Tam)';}
          let temp7 = temp1[i].Address.PremisesAddress.GeospatialInformation.Latitude;
          let temp8 = temp1[i].Address.PremisesAddress.GeospatialInformation.Longitude;
          temp2.push({
            address: temp5,
            region: temp6,
            latitude: temp7,
            longitude: temp8,
          });
          };
          setErrorSearch('');
          setCityOption(temp2);
          setC(null);
          setLoadingCity(false);
        })
        .catch((err) => {
          setErrorSearch(err.message);
          setCityOption([]);
          setA(null);setB(null);setC(null);setX(null);setY(null);
          setLoadingCity(false);
        });
    }

    return (
        <div>
            <MemberCheckoutSteps step1 step2 ></MemberCheckoutSteps>
            <div className="member_shipment_wrapper">
            <div className="member_shipment_column_1">
            <div className="member_shipment_card">
                <div className="card-header">
                    <h2>{shippingGet ? "New Shipping Address?" : "Create a Shipping Address First"}</h2>
                </div>
                <div className="member_shipment_card-body">
                <form onSubmit={searchAPIHandler}>
                    <div className="member_shipment_card-body_children">
                        { loadingCity ?
                        <label htmlFor="searchKeyword">
                        Searching...{" "}
                        </label> :
                        <label htmlFor="searchKeyword">
                        Input Keyword and Search{" "}
                        </label>
                        }
                        <input
                        size="lg"
                        id="searchKeyword"
                        placeholder="Input street/building name"
                        type="text"
                        name="searchKeyword"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </div>
                    <div className="member_shipment_card-body_children">
                        <button variant="primary" type="submit" >
                            Search
                        </button>
                    </div>
                    {errorSearch && <div><div>Search Failure</div></div>}
                </form>
            { cityOption[0] ?
                <form onSubmit={placeShippingHandler}>
                    <div className="member_shipment_card-body_children">{loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{error} </div>
                    ) : <div></div>}
                    { (a && b && c && d)
                    ||(!a && !b && !c && !d)
                    ? <div></div>
                    : <div>Fill in all the fields.</div>}
                    </div>
                    <div className="member_shipment_card-body_children">
                        <label htmlFor="address">
                            Room
                        </label>
                        <input type="text" name="address" id="address" onChange={(e)=>setA("Room "+e.target.value)}></input>
                    </div>
                        <div className="member_shipment_card-body_children">
                        <label htmlFor="area">
                            Floor
                        </label>
                           
                        <input type="text" name="area" id="area" onChange={(e)=>setB(e.target.value+"/F")}></input>
                        </div>
                        <div className="member_shipment_card-body_children">
                            <label>Street / Building</label>
                            { loadingCity ?
                            <DropdownList busy /> :
                            <DropdownList
                            data={cityOption}
                            textField='address'
                            name="city" id="city"
                            onChange={(e) => {setC(e.address);setD(e.region);setX(e.latitude);setY(e.longitude);}} />
                            }
                        </div>
                    <div className="member_shipment_card-body_children">
                        {
                        a && b && c && d ?
                        <button type="submit" className="button primary">Create</button>:
                        <button disabled type="submit" className="button primary">Create</button>
                        }
                    </div>
                </form>
            : '' }
                </div>
                </div>
            </div>
            <div className="member_shipment_column_2">
                <div className="member_shipment_card">
                <form onSubmit={submitHandler}>
                    <div className="card-header">
                        <h2>Saved Address(es)</h2>
                    </div>
                    <div className="member_shipment_card-body">
                    <div>{success ? (<div>New Address Received</div>) :
                    loadingDelete ? (<div>Loading...</div>) :
                    errorDelete ? (<div>Fail to Delete Address</div>) :
                    successDelete ? (<div>Address Removed</div>) : <></>}
                    </div>
                    <div>
                    <div>
                        {shippingGet ? shippingGet.map( (shipping, index) => <div key={index} className="shipping_address">
                        <input type="radio" id={index} name="address" value={shipping._id}
                        onClick={()=>{
                            setShippingID(shipping._id);
                            setAddress(shipping.address);
                            setArea(shipping.area);
                            setCity(shipping.city);
                            setCountry(shipping.country);
                            setLatitude(shipping.latitude);
                            setLongitude(shipping.longitude);
                            }}/>
                        <label htmlFor={index} className="shipping">
                        <div>{shipping.address},</div>
                        <div>{shipping.area},</div>
                        <div>{shipping.city},</div>
                        <div>{shipping.country}</div></label>
                        <button onClick={(e)=>deleteHandler(e, shipping)}>Delete</button>
                        </div>):''}
                    </div>
                    </div>
                    <div>
                        {
                        shippingID ?
                        <button type="submit" className="button primary">Continue</button>:
                        <div><button disabled type="submit" className="button primary">Continue</button></div>
                        }
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </div>
    )}
export default MemberShippingScreen;