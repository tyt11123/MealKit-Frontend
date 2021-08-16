import React, { useEffect, useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../Redux/Actions/CartActions";
import { listPlan, } from "../Redux/Actions/planActions";
import PriceCalculation from "../Components/PriceCalculation";
import { Table } from "reactstrap";
import { Icon } from "react-icons-kit";
import { timesCircle } from "react-icons-kit/fa/timesCircle";

import "./CartScreen.css";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const planList = useSelector(state => state.planList);
  const { bulkQty, bulkAmount, bulkCeiling, } = planList;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const [itemsQty, setItemsQty] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [bulkPrice, setBulkPrice] = useState(0);

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const checkOutHandler = () => {
    userInfo ?
    props.history.push("/memberShipping") :
    props.history.push("/shipping");
  };
  const handlePlus = (product) => {
    if (product.qty<product.countInStock) {dispatch(addToCart(product.product, product.qty+1))};
  };
  const handleMinus = (product) => {
    if (product.qty>1) {dispatch(addToCart(product.product, product.qty-1))};
  };

  useEffect(() => {
    dispatch(listPlan());
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    if (!userInfo) {
      props.history.push("/shipping");
    }
  }, [userInfo]);

  useEffect(() => {
    const calculation = new PriceCalculation(cart, planList);
    setItemsQty(calculation.itemsQty);
    setOriginalPrice(calculation.originalPrice);
    setBulkPrice(calculation.bulkPrice);
    return () => {};
  }, [cart, planList]);

  return (
    <div className="cartDiv_outta formDiv">
      <div className="cartDiv_inner">
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
            </div>
          </div>
        {/* <div className="cart-list">
          <div className="cart-list__Title">
            <h2>My Shopping Cart</h2>
          </div>
          <div className="productPicked__div">
            <ul className=" cart-list-container">
              {cartItems.length === 0 ? (
                <div className="d-flex justify-content-center">
                  Cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div className="card text-center card-header">
                    
                      <div className="">
                        <img
                          src={item.image[0]}
                          alt="product"
                          className="cartScreen_img"
                        />
                      </div>
                      <div className="text-center ">
                        <div className="card-title cartScreen_title_link">
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                          <h2>$ {item.price}</h2>
                        </div>
                      </div>

                      <div className="cart-price "></div>
                      <div className="cartDetail_choices">
                        Qty:{" "}
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="btn btn-secondary "
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                        </button>
                      </div>
                    
                  </div>
                ))
              )}
            </ul>
          </div>
          
        </div> */}
        <div className="cart-action-outta">
          <div className="cartAct_inner">
            {/* <div className="cartAct_inner_first">
              <deliveryday className="cart_servey_delivery">
                <p>
                  Delivery Date <i>(We offer Wednesday, Saturday only)</i>
                </p>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Wednesday</option>
                  <option>Saturday</option>
                </Input>
              </deliveryday>
              <people className="cart_servey_people">
                <p>People to serve</p>
                <Input type="select" name="select" id="Select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Input>
              </people>
            </div>
            <div className="cartAct_inner_second">
              <p>Special Request</p>
              <FormGroup check>
                <Input
                  type="checkbox"
                  name="check"
                  id="CheckBox1"
                  className="checkBox"
                />
                <Label for="CheckBox1" check>
                  No Beef
                </Label>
                <Input
                  type="checkbox"
                  name="check"
                  id="CheckBox2"
                  className="checkBox"
                />
                <Label for="CheckBox2" check>
                  No Pork
                </Label>
                <Input
                  type="checkbox"
                  name="check"
                  id="CheckBox3"
                  className="checkBox"
                />
                <Label for="CheckBox3" check>
                  No Chicken
                </Label>
                <Input
                  type="checkbox"
                  name="check"
                  id="CheckBox4"
                  className="checkBox"
                />
                <Label for="CheckBox4" check>
                  No Egg
                </Label>
                <Input
                  type="checkbox"
                  name="check"
                  id="CheckBox5"
                  className="checkBox"
                />
                <Label for="CheckBox5" check>
                  No Nuts
                </Label>
              </FormGroup>
            </div> */}
            <p>
              小計&nbsp;Subtotal: ({itemsQty} item) : $
              { bulkPrice[0] && (bulkPrice[0] < originalPrice)
              ? <><del>{originalPrice}</del>&nbsp;{bulkPrice[0]}</>
              : originalPrice }
            </p>
          </div>
          {itemsQty > 0 ? (
            <button
              onClick={checkOutHandler}
              className="button primary full-width"
            >
              <h3>前往結賬 Process to Checkout</h3>
            </button>
          ) : (
            <button disabled className="button">
              <h3>前往結賬 Process to Checkout</h3>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartScreen;


{/* <div className="productPicked__div">
            <ul className=" cart-list-container">
              {cartItems.length === 0 ? (
                <div className="d-flex justify-content-center">
                  Cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div className="card text-center card-header">
                    
                      <div className="">
                        <img
                          src={item.image}
                          alt="product"
                          className="cartScreen_img"
                        />
                      </div>
                      <div className="text-center ">
                        <div className="card-title cartScreen_title_link">
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                          <h2>$ {item.price}</h2>
                        </div>
                      </div>

                      <div className="cart-price "></div>
                      <div className="cartDetail_choices card-body">
                        Qty:{" "}
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="btn btn-secondary "
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                        </button>
                      </div>
                    
                  </div>
                ))
              )}
            </ul>
          </div> */}


