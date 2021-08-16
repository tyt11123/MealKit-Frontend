import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { saveShipping, addToCart, removeFromCart, saveRemark, savePayment,
  saveTime, saveCoupon, } from "../Redux/Actions/CartActions";
import CheckoutSteps from "../Components/CheckoutSteps";
import {
  createShipping,
  listShippings,
  deleteShipping,
} from "../Redux/Actions/shippingActions";
import { listPlan } from "../Redux/Actions/planActions";
import { listDayOff, } from "../Redux/Actions/dayOffActions";
import { verifyCoupon } from "../Redux/Actions/CouponActions";
import PriceCalculation from "../Components/PriceCalculation";
import DayOffCalculation from "../Components/DayOffCalculation";
import { Form } from "react-bootstrap";

// import AreaSelect from '../Components/AreaSelect/AreaSelect';
import axios from "axios";
import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";
// reactstrap for table
import { Table } from "reactstrap";
// import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
// import ReactSelectList from "react-selectlist";

// icon
import { Icon } from "react-icons-kit";

import { timesCircle } from "react-icons-kit/fa/timesCircle";
// css
import "./ShippingScreen.css";

const ShippingScreen = (props) => {
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("HK");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [shippingID, setShippingID] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cityOption, setCityOption] = useState([]);
  const [loadingCity, setLoadingCity] = useState(false);
  const [errorSearch, setErrorSearch] = useState("");
  const [code, setCode] = useState("");
  const [couponForm, setCouponForm] = useState(false);
  const [remark, setRemark] = useState("");
  const [timeOption, setTimeOption] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const shippingCreate = useSelector((state) => state.shippingCreate);
  const { loading, success, error, shipping } = shippingCreate;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const planList = useSelector((state) => state.planList);
  const { bulkQty, bulkAmount, bulkCeiling } = planList;
  const dayOffList = useSelector(state => state.dayOffList);
  const { bulkDate, loading: loadingDayOff, success: successDayOff, error: errorDayOff, } = dayOffList;
  const couponVerify = useSelector((state) => state.couponVerify);
  const {
    loading: loadingCoupon,
    success: successCoupon,
    error: errorCoupon,
    coupon,
  } = couponVerify;
  const [itemsQty, setItemsQty] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [bulkPrice, setBulkPrice] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [fullPrice, setFullPrice] = useState(0);
  const [redemptionPrice, setRedemptionPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const shippingList = useSelector((state) => state.shippingList);
  const {
    loading: loadingGet,
    shipping: shippingGet,
    error: errorGet,
  } = shippingList;

  const shippingDelete = useSelector((state) => state.shippingDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = shippingDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/cart");
    }
    dispatch(listPlan());
    dispatch(listDayOff());
    return () => {
      // cleanup
    };
  }, [userInfo]);

  useEffect(() => {
    const calculation = new PriceCalculation(cart, planList, coupon, country);
    setItemsQty(calculation.itemsQty);
    setOriginalPrice(calculation.originalPrice);
    setBulkPrice(calculation.bulkPrice);
    setItemsPrice(calculation.itemsPrice);
    setShippingPrice(calculation.shippingPrice);
    setFullPrice(calculation.fullPrice);
    setRedemptionPrice(calculation.redemptionPrice);
    setTotalPrice(calculation.totalPrice);
    return () => {};
  }, [cart, planList, coupon, country]);

  useEffect(() => {
    if (successDayOff && !(timeOption[0])) {
      const calculation = new DayOffCalculation(bulkDate);
      setTimeOption([...calculation.timeOption]);
    };
    return () => {};
  }, [successDayOff]);

  useEffect(() => {
    if (userInfo && userInfo.allergies && userInfo.allergies[0]) {
      setRemark(userInfo.allergies.join("\n"));
    }
    return () => {};
  }, [userInfo]);

  useEffect(() => {
    if (coupon && coupon.amount_minimum) {
      dispatch(verifyCoupon(code, fullPrice));
    };
    if (coupon && coupon.balance && (totalPrice <= 0) ) {
      setPaymentMethod("Giftcard");
    } else {
      setPaymentMethod("stripe");
    };
    return () => {};
  }, [fullPrice]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, area, city, country, latitude, longitude, }));
    dispatch(saveRemark(remark));
    dispatch(savePayment({ paymentMethod }));
    dispatch(saveTime(deliveryTime.value));
    coupon && coupon.valid && dispatch(saveCoupon(coupon.code));
    props.history.push("payment");
  };

  function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if (typeof ob[i] == "object" && ob[i] !== null) {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + "." + x] = flatObject[x];
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
          Accept: "application/json",
          "Accept-Language": "en,zh-Hant",
        },
      })
      .then((response) => {
        let temp1 = response.data.SuggestedAddress;
        let temp2 = [];
        for (let i = 0; i < temp1.length; i++) {
          if (temp1[i].Address.PremisesAddress.EngPremisesAddress.EngStreet) {
            let temp3 =
              temp1[i].Address.PremisesAddress.EngPremisesAddress.EngStreet;
            temp1[
              i
            ].Address.PremisesAddress.EngPremisesAddress.EngStreet = Object.values(
              temp3
            ).join("-");
          }
          if (temp1[i].Address.PremisesAddress.EngPremisesAddress.EngBlock) {
            delete temp1[i].Address.PremisesAddress.EngPremisesAddress.EngBlock
              .BlockDescriptorPrecedenceIndicator;
          }
          if (temp1[i].Address.PremisesAddress.ChiPremisesAddress.ChiStreet) {
            let temp3 =
              temp1[i].Address.PremisesAddress.ChiPremisesAddress.ChiStreet;
            temp1[
              i
            ].Address.PremisesAddress.ChiPremisesAddress.Chitreet = Object.values(
              temp3
            ).join("-");
          }
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
        }
        setErrorSearch("");
        setCityOption(temp2);
        setCity(null);
        setLoadingCity(false);
      })
      .catch((err) => {
        setErrorSearch(err.message);
        setCityOption([]);
        setAddress(null);
        setArea(null);
        setCity(null);
        setLatitude(null);
        setLongitude(null);
        setLoadingCity(false);
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    props.history.push("/signin?redirect=memberShipping");
  };
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const handlePlus = (product) => {
    if (product.qty<product.countInStock) {dispatch(addToCart(product.product, product.qty+1))};
  };
  const handleMinus = (product) => {
    if (product.qty>1) {dispatch(addToCart(product.product, product.qty-1))};
  };
  const couponHandler = (e) => {
    e.preventDefault();
    dispatch(verifyCoupon(code, fullPrice));
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <div className="formDiv">
        {!(userInfo) && <div className="signInform">
          <p>已經是會員？登入後可以更方便管理訂單！</p>
          <button onClick={signInHandler} className="button primary">
            Sign In
          </button>
        </div>}
        <div className="myCart_form">
          <div className="myCart_orders">
            <div className="card myCart_cardDiv">
              <div className="card-header">
                <h4
                  style={{ fontSize: "2rem", margin: "0", fontWeight: "600" }}
                >
                  購物車 ({itemsQty} 件)
                </h4>
              </div>

              {cartItems.length === 0 ? (
                  <div className="myCartOrder_table d-flex justify-content-center">
                    <h1>The Cart is empty</h1>
                  </div>
                ) : (
              <Table bordered className="myCartOrder_table">
                <thead>
                  <tr>
                    <th className="tb_mobile"></th>
                    <th className="tb_mobile"></th>
                    <th>商品資料</th>
                    <th>價格</th>
                    <th>數量</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                  <tr key={index}>
                    <th scope="row" className="tb_mobile">
                      {index + 1}
                    </th>
                    <td className="td_productInfo  ">
                      <a className="myCart_pfl">
                        {" "}
                        <img
                          className="myCart_image"
                          src={item.image[0]}
                        />{" "}
                      </a>
                    </td>
                    <td className="tb_mobile"><h4>{item.name}</h4></td>
                    <td>
                      <h2>$ {item.price}</h2>
                    </td>
                    <td>
                      <div className="myCart_CounterGroup">
                        <button className="myCart_Counter productAct_btn"
                        onClick={() => handlePlus(item)}>
                          <p>+</p>
                        </button>
                        <p>{item.qty}</p>
                        <button className="myCart_Counter productAct_btn"
                        onClick={() => handleMinus(item)}>
                          <p>-</p>
                        </button>
                      </div>
                    </td>
                    <td>
                      <button className="myCart_DelBtn">
                      <Icon
                        size={35}
                        icon={timesCircle}
                        className="btn-secondary myCart_DelBtn"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      />
                      </button>
                    </td>
                  </tr>))}
                </tbody>
              </Table>
              )}
              {/* <div className="myCart_card-body ">
                <div className=" myCart_productItem">
                  
                  
                </div>
              </div> */}
            </div>
          </div>
          <div className="myCart_formSub">
            <div className="card  myCart_orderInfo">
              <div className="card-header">
                <h4 style={{ fontSize: "2rem", margin: "0", fontWeight: "600" }}>訂單資訊</h4>
              </div>
              <div className="myCart_card-body ">
                <div className="formQs">
                  <div className="formQs_SR">
                    {/* Special Request, please add a tag, then when clicked pop out a div to select
                    , and let people to click on something they don't want (e.g:no nuts). then show it in the same inline  */}
                    <h5>備注︰食材不含以下成分︰
Remarks: The Ingredient Listed Below will be Excluded:</h5>{" "}
                    <textarea
                      name="remark"
                      id="remark"
                      cols="30"
                      rows="4"
                      value={remark}
                      placeholder="You Can Leave It Blank 可以留空"
                      onChange={(e) => setRemark(e.target.value)}
                    ></textarea>
                    <h3>&nbsp;</h3>
                  </div>
                  <div className="formQs_1">
                    <h3>Sub-Total:</h3> <h3>HK$&nbsp;{originalPrice > itemsPrice ?
                    <><del>{originalPrice.toFixed(2)}</del>&nbsp;{itemsPrice.toFixed(2)}</> :
                    itemsPrice.toFixed(2)}</h3>
                  </div>
                  <div className="formQs_1">
                    <h3>Delivery Fee:</h3> <h3>HK$&nbsp;{coupon && coupon.unit_off ? <><del>{shippingPrice.toFixed(2)}</del>&nbsp;0.00</>: shippingPrice.toFixed(2)}</h3>
                  </div>
                  <div className="formQs_1" onClick={()=>setCouponForm(true)}>
                    {/* for below text, write code for click for the text,then pop up input bar  */}
                    <Link onClick={(e)=>e.preventDefault()} to='#'><h4>Use Discount Code?</h4></Link>
                  </div>
                  {couponForm ?
                  <div className="formQs_1">
                    <form onSubmit={couponHandler}>
                      <label htmlFor="code">Enter Your Coupon Code:&nbsp;</label>
                      <input
                        type="text"
                        name="code"
                        onChange={(e) => setCode(e.target.value)}
                      ></input>
                      &nbsp;
                      <button type="submit">Check</button>
                      <div>
                        {loadingCoupon && "Loading..."}
                        {successCoupon
                          ? coupon.valid
                            ? (coupon.balance >= 0)
                              ? `Current Gift Card Balance: $${coupon.balance}`
                              : coupon.amount_off
                              ? `One-time Amount Off: $${coupon.amount_off}`
                              : coupon.percent_off
                              ? `${coupon.percent_off}% Discount`
                              : coupon.unit_type
                              ? `${coupon.unit_type} Waiver`
                              : ""
                            : coupon.expiredAt && (new Date(coupon.expiredAt) < new Date())
                            ? "Coupon Expired"
                            : coupon.amount_minimum &&
                              fullPrice < Number(coupon.amount_minimum)
                            ? `Minimum order $${coupon.amount_minimum}!`
                            : "Coupon Invalid"
                          : ""}
                        {errorCoupon && "Coupon Verification Failure"}
                      </div>
                    </form>
                  </div>
                  :""}
                  <hr></hr>
                  <div className="formQs_1">
                    <h1>Total:</h1> <h1>HK$&nbsp;
                    {redemptionPrice ? (
                      <><del>{fullPrice.toFixed(2)}</del>&nbsp;{totalPrice.toFixed(2)}</>
                    ) : (totalPrice.toFixed(2))}
                    </h1>
                  </div>
                  <div className="formQs_1 formQs_btn">
                    {itemsQty && address && area && city && country && deliveryTime?
                    <button
                      type="submit"
                      className="button primary"
                      style={{ fontSize: "2.4rem" }}
                      onClick={submitHandler}
                    >
                      To payment
                    </button>:
                    <button disabled
                      type="submit"
                      className="button primary"
                      style={{ fontSize: "2.4rem" }}
                    >
                      To payment
                    </button>}
                  </div>
                </div>
              </div>
            </div>
            <div className="myCart_orderInfo_secondary">
              <div className="card myCart_cardDiv">
                <div className="card-header">
                  <h4 style={{ fontSize: "2rem", margin: "0", fontWeight: "600" }}>選擇送貨及付款方式</h4>
                </div>
                <div className="myCart_card-body ">
                  <div className="formQs">
                    <ul className="formQs_3">
                      <form onSubmit={searchAPIHandler}>
              <li>
                {loadingCity ? (
                  <h4>搜尋中...</h4>
                ) : (
                  <h4>輸入街道 / 樓宇名稱並按搜尋以確認送貨地點</h4>
                )}
                <input
                  size="lg"
                  id="searchKeyword"
                  placeholder="輸入街道 / 樓宇名稱"
                  type="text"
                  name="searchKeyword"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </li>
              <li>
                <button variant="primary" type="submit">
                  搜尋
                </button>
              </li>
              {errorSearch && (
                <li>
                  <div>沒有結果。請更改搜尋條件，重新搜尋一次。</div>
                </li>
              )}
            </form>
            </ul>
            { cityOption[0] ?
              <ul className="formQs_3">
                    <li>{loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{error} </div>
                    ) : <div></div>}
                    { (address && area && city && country)
                    ||(!address && !area && !city && !country)
                    ? <div></div>
                    : <div>填寫所有以下空格</div>}
                    </li>
                    <li>
                        <label htmlFor="address">
                            房號
                        </label>
                        <input type="text" name="address" id="address" onChange={(e)=>setAddress("Room "+e.target.value)}></input>
                    </li>
                        <li>
                        <label htmlFor="area">
                            樓層
                        </label>
                           
                        <input type="text" name="area" id="area" onChange={(e)=>setArea(e.target.value+"/F")}></input>
                        </li>
                        <li>
                            <label>街道 / 樓宇</label>
                            { loadingCity ?
                            <DropdownList busy /> :
                            <DropdownList
                            data={cityOption}
                            textField='address'
                            name="city" id="city"
                            onChange={(e) => {setCity(e.address);setCountry(e.region);setLatitude(e.latitude);setLongitude(e.longitude);}} />
                            }
                        </li>
              </ul>
            : ("")}
                    <div className="formQs_2">
                      <h4>送貨方式</h4>{" "}
                      <Form.Control as="select" size="lg">
                        <option>直送府上</option>
                      </Form.Control>
                    </div>
                    <div className="formQs_2">
                      <h4>送貨時間</h4>{" "}
                      { loadingDayOff ?
                      <DropdownList busy /> :
                      <DropdownList
                      data={timeOption}
                      textField='text'
                      name="time" id="time"
                      placeholder="請選擇 Please Select..."
                      onChange={(e) => setDeliveryTime(e)} />
                      }
                    </div>
                    <div className="formQs_2">
                      {/* for below text, write code for click for the text,then pop up input bar  */}
                      <h4>付款方式</h4>
                      <Form.Control as="select" size="lg">
                        <option>網上付款</option>
                      </Form.Control>

                      <p
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "1.4rem",
                        }}
                      >
                        <span className="formQs_span">
                          貨物數量有限，落單後請於24小時內付款，否則將會取消訂單，不獲另外通知。
                        </span>
                        <span>户口名稱︰Sweety Magic LTD</span>
                        <span>
                          ※
                          我們在確認收到款項後會以e-mail方式確認收款，並會安排寄出郵件。
                        </span>
                        <span>
                          付款磪認後此商品不可退貨/換貨 SweetyMagic.Ltd
                          保留所有權利.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
;
export default ShippingScreen;
