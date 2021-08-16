import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveRemark, saveAnonymous, } from "../Redux/Actions/CartActions";
import { verifyCoupon } from "../Redux/Actions/CouponActions";
import PriceCalculation from "../Components/PriceCalculation";
import CheckoutSteps from "../Components/CheckoutSteps";
// import { Form } from "reactstrap";
import { Form } from "react-bootstrap";
import { Table } from "reactstrap";

import "./PaymentScreen.css";
// Remark :: !important PaymentScreen is now also set as input customer info
const PaymentScreen = (props) => {
  const [paymentMethod, setpaymentMethod] = useState("");
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment, remark: remark_history, coupon: code, } = cart;
  const [remark, setRemark] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEquals, setRecipientEquals] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [showCartItems, setShowCartItems] = useState(false);
  const dispatch = useDispatch();

  const planList = useSelector((state) => state.planList);
  const { bulkQty, bulkAmount, bulkCeiling } = planList;
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveRemark(remark));
    dispatch(saveAnonymous({name, email, phone, recipient, recipientPhone}));
    props.history.push("placeorder");
  };
  const handleBack = (e) => {
    e.preventDefault();
    props.history.goBack();
  };

  if (!shipping.address) {
    props.history.push("/shipping");
  }

  useEffect(() => {
    if (remark_history) {
      setRemark(remark_history);
    };
    return () => {};
  }, [remark_history]);

  useEffect(() => {
    if (payment) {
      setpaymentMethod(payment);
    };
    return () => {};
  }, [payment]);

  useEffect(() => {
    if (recipientEquals) {
      setRecipient(name);
      setRecipientPhone(phone);
    } else {
      setRecipient("");
      setRecipientPhone("");
    };
    return () => {};
  }, [recipientEquals]);

  useEffect(() => {
    if (code && fullPrice) {
      dispatch(verifyCoupon(code, fullPrice));
    };
    return () => {};
  }, [code, fullPrice]);

  useEffect(() => {
    const calculation = new PriceCalculation(cart, planList, coupon, shipping && shipping.country);
    setItemsQty(calculation.itemsQty);
    setOriginalPrice(calculation.originalPrice);
    setBulkPrice(calculation.bulkPrice);
    setItemsPrice(calculation.itemsPrice);
    setShippingPrice(calculation.shippingPrice);
    setFullPrice(calculation.fullPrice);
    setRedemptionPrice(calculation.redemptionPrice);
    setTotalPrice(calculation.totalPrice);
    return () => {};
  }, [cart, planList, coupon, shipping]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className="PayStep2_form__outta">
        <div className="reviewCart_div">
          <h3>
            Total: HKD$ {redemptionPrice ?
              (<><del>{fullPrice.toFixed(2)}</del>&nbsp;{totalPrice.toFixed(2)}</>)
            : (totalPrice.toFixed(2))}
          </h3>
          <div onClick={()=>setShowCartItems(!showCartItems)}>
            <Link onClick={(e)=>e.preventDefault()} to='#'><h4>{showCartItems?"Hide":"Show"} Details</h4></Link>
          </div>
          {showCartItems &&
            <div className="myCart_orders">
            <div className="card myCart_cardDiv">
              <div className="card-header">
                <h4
                  style={{ fontSize: "2rem", margin: "0", fontWeight: "600" }}
                >
                  購物細明 ({itemsQty} 件)
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
                      <h2>{item.qty}</h2>
                    </td>
                  </tr>))}
                </tbody>
              </Table>
              )}
            </div>
            <div className="subTotal_div">
              <h3>Sub-Total 小計:&nbsp;HK$&nbsp;{itemsPrice.toFixed(2)}</h3>
              <h3>Delivery Fee 運費:&nbsp;HK$&nbsp;{coupon && coupon.unit_off ? <><del>{shippingPrice.toFixed(2)}</del>&nbsp;0.00</>: shippingPrice.toFixed(2)}</h3>
            </div>
            {code && coupon ?
              <div className="subTotal_div">
                <h3>Coupon Code:&nbsp;{code}</h3>
                <h3>{coupon.valid
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
                : "Coupon Invalid"}</h3>
              </div>
            : ""}
          </div>}
        </div>
        <div className="PayStep2_form__inner">
          <div className="card cardDiv_payScreen">
            <div className="card-header">
              <h3>顧客資料</h3>
            </div>

            <div className="myCart_card-body ">
              <div className="formQs">
                {" "}
                <div className="formQs_2">
                  <h4>
                    以會員身份快速結帳？可立即
                    <span>
                      {" "}
                      <Link to="/signin?redirect=memberShipping">Login</Link>
                    </span>
                  </h4>{" "}
                </div>
                <div className="formQs_2">
                  <label htmlFor="name">顧客名稱&nbsp;</label>
                  <input
                    type="text" name="name" id="name"
                    placeholder="Enter Full Name"
                    onChange={(e) => {
                      setName(e.target.value);
                      if (recipientEquals) {setRecipient(e.target.value);}
                    }}
                  ></input>
                </div>
                <div className="formQs_2">
                  <label htmlFor="email">電子信箱&nbsp;</label>
                  <input
                    type="text" name="email" id="email"
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="formQs_2">
                  <label htmlFor="phone">電話號碼&nbsp;</label>
                  <input
                    type="text" name="phone" id="phone"
                    placeholder="Enter Phone Number"
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (recipientEquals) {setRecipientPhone(e.target.value);}
                    }}
                  ></input>
                  <h4></h4>{" "}
                  <Form>
                    <Form.Text className="text-muted">
                      We'll never share your information with anyone else.
                    </Form.Text>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="card cardDiv_payScreen">
            <div className="card-header">
              <h3>送貨資料 </h3>
            </div>
            <div className="myCart_card-body ">
              <div className="formQs">
                <div className="formQs_2">
                  <h4>
                    已選擇的送貨方式: 辦公室/住宅地址直送
                  </h4>{" "}
                </div>
                <div className="formQs_2">
                  <div>
                    <input type="checkbox" id="recipient_equals" defaultChecked={recipientEquals} 
                    onChange={(e)=>{
                        setRecipientEquals(e.target.checked);
                    }}/>
                    <label htmlFor="recipient_equals">&nbsp;&nbsp;收件人資料與顧客資料相同</label>
                  </div>
                </div>
                <div className="formQs_2">
                  <label htmlFor="recipient">收件人名稱&nbsp;</label>
                  {recipientEquals ?
                  <input type="text" value={recipient} disabled/>
                  :<input
                    type="text" name="recipient" id="recipient"
                    placeholder="Enter Full Name"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  ></input>}
                </div>
                <Form>
                  <Form.Group>
                    <Form.Text className="text-muted">
                      請填入收件人真實姓名，以確保順利收件
                    </Form.Text>
                  </Form.Group>
                </Form>
                <div className="formQs_2">
                  <label htmlFor="recipientPhone">收件人電話號碼&nbsp;</label>
                  {recipientEquals ?
                  <input type="text" value={recipientPhone} disabled/>
                  :<input
                    type="text" name="recipientPhone" id="recipientPhone"
                    placeholder="Enter Phone Number"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                  ></input>}
                </div>
                <div className="formQs_2">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <div><Form.Label>送貨地點 : 香港</Form.Label></div>
                      <div><Form.Label>{shipping.address}</Form.Label></div>
                      <div><Form.Label>{shipping.area}</Form.Label></div>
                      <div><Form.Label>{shipping.city}</Form.Label></div>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="card cardDiv_payScreen PaidOption">
            <div className="card-header">
              <h3>付款資料</h3>
            </div>
            <div className="myCart_card-body ">
              <div className="formQs">
                <h4>已選擇的付款方式: {payment.paymentMethod}</h4>
                <div className="text-muted">
                  本公司預設Stripe作為網上信用卡付款平台.
                </div>
              </div>
            </div>
          </div>
          <div className="card cardDiv_payScreen">
            <div className="card-header">
              <h4>訂單備註 </h4>
            </div>
            <div className="myCart_card-body ">
              <div className="formQs">
                <div className="formQs_SR">
                  <h5>備注 Remarks:</h5>
                  <textarea
                    name="remark"
                    id="remark"
                    cols="30"
                    rows="4"
                    value={remark}
                    placeholder="You Can Leave It Blank 可以留空"
                    onChange={(e) => setRemark(e.target.value)}
                  ></textarea>
                </div>
                <div className="formQs_2">
                  <div>
                    <input type="checkbox" id="agree_policy" defaultChecked={agreePolicy} 
                    onChange={(e)=>{
                        setAgreePolicy(e.target.checked);
                    }}/>
                    <label htmlFor="agree_policy">&nbsp;&nbsp;我同意網站服務條款及隱私政策</label>
                  </div>
                </div>
                {/* <Form>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      className="formQs_checkBox"
                      type="checkbox"
                      label=" 我同意網站服務條款及隱私政策"
                    />
                  </Form.Group>{" "}
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      className="formQs_checkBox"
                      type="checkbox"
                      label=" 成為 SweetyMagic 的會員"
                    />
                  </Form.Group>{" "}
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      className="formQs_checkBox"
                      type="checkbox"
                      label=" 我想收到最新資訊及優惠方案"
                    />
                  </Form.Group>
                </Form> */}
                <hr></hr>
                {name && email && phone && recipient && recipientPhone && agreePolicy ?
                  <button onClick={submitHandler} className="button primary">提交訂單</button>:
                  <button disabled className="button primary">提交訂單</button>}
              </div>
            </div>
          </div>
        </div>
        <div className="back-to-result" >
          <Link onClick={handleBack} to="#" className="pages_path_BackToResult " style={{}}>
            <h2 style={{margin:"0"}}>Previous Page </h2>
          </Link>
        </div>
      </div>
    </>
  );
};
export default PaymentScreen;