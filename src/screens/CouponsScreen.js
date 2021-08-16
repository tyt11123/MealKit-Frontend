import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listCoupons, saveCoupon, deleteCoupon, } from '../Redux/Actions/CouponActions';
import Combobox from 'react-widgets/lib/Combobox';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CouponsScreen = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [type, setType] = useState('')
    const [discount_type, setDiscountType] = useState('')
    const [percent_off, setPercentOff] = useState('')
    const [amount_minimum, setAmountMinimum] = useState('')
    const [amount_off, setAmountOff] = useState('')
    const [unit_off, setUnitOff] = useState('')
    const [unit_type, setUnitType] = useState('')
    const [amount, setAmount] = useState('')
    const [balance, setBalance] = useState('')
    const [redeemable_qty, setRedeemableQty] = useState('')
    const [redeemed_qty, setRedeemedQty] = useState('')
    const [active, setActive] = useState('')
    const [published, setPublished] = useState('')
    const [expiredAt, setExpiredAt] = useState('')
    const [discount, setDiscount] = useState('')
    const [gift, setGift] = useState('')
    const [redemption, setRedemption] = useState('')
    const types = ["DISCOUNT_VOUCHER", "GIFT_VOUCHER"];
    const discount_types = ["AMOUNT", "PERCENT", "UNIT"];
    const couponList = useSelector(state => state.couponList);
    const { loading, coupons, error } = couponList;

    const couponSave = useSelector(state => state.couponSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = couponSave;
    const couponDelete = useSelector(state => state.couponDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = couponDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false)
        }
        dispatch(listCoupons());
        return () => {
            // cleanup
        };
    }, [successSave,successDelete])

    const openMoadal = (coupon) => {
        setModalVisible(true);
        setId(coupon._id ? coupon._id : '');
        setCode(coupon.code ? coupon.code : '');
        setType(coupon.type ? coupon.type : '');
        setRedeemableQty(coupon.redeemable_qty ? coupon.redeemable_qty : '');
        setRedeemedQty(coupon.redeemed_qty ? coupon.redeemed_qty : '');
        setActive(coupon.active); 
        setPublished(coupon.published);
        setExpiredAt(coupon.expiredAt ? new Date(coupon.expiredAt) : '');
        setDiscount(coupon.discount);
        setGift(coupon.gift);
        if (coupon.discount) {
            setDiscountType(coupon.discount.discount_type ? coupon.discount.discount_type : '');
            setPercentOff(coupon.discount.percent_off ? coupon.discount.percent_off : '');
            setAmountMinimum(coupon.discount.amount_minimum ? coupon.discount.amount_minimum : '');
            setAmountOff(coupon.discount.amount_off ? coupon.discount.amount_off : '');
            setUnitOff(coupon.discount.unit_off ? coupon.discount.unit_off : '');
            setUnitType(coupon.discount.unit_type ? coupon.discount.unit_type : '');
        } else {
            setDiscountType('');
            setPercentOff('');
            setAmountMinimum('');
            setAmountOff('');
            setUnitOff('');
            setUnitType('');
        };
        if (coupon.gift) {
            setAmount(coupon.gift.amount ? coupon.gift.amount : '');
            setBalance(coupon.gift.balance ? coupon.gift.balance : '');
        } else {
            setAmount('');
            setBalance('');
        };
        setRedemption(coupon.redemption);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveCoupon({
            _id: id ? id : null, code: code ? code : null,
            type: type ? type : null, discount_type: discount_type ? discount_type : null, 
            percent_off: percent_off ? percent_off : null, 
            amount_minimum: amount_minimum ? amount_minimum : null, 
            amount_off: amount_off ? amount_off : null,
            unit_off: unit_off ? unit_off : null, 
            unit_type: unit_type ? unit_type : null, 
            amount: amount ? amount : null, balance: balance ? balance : null,
            redeemable_qty: redeemable_qty ? redeemable_qty : null, 
            active, published,
            expiredAt: expiredAt? expiredAt.toISOString(): null, 
        }));
    }

    const deleteHandler = (coupon) => {
        dispatch(deleteCoupon(coupon._id));
    }

    const typeHandler = (value) => {
        switch (value) {
            case "DISCOUNT_VOUCHER":
                setDiscount({});
                setGift(null);
                break;
            case "GIFT_VOUCHER":
                setDiscount(null);
                setGift({});
                break;
        }
        setType(value);
    };

    return (
        <div className="content-margined">
            <div className="product-header">
                <h1>Coupons</h1>
                <button className=" btn" onClick={()=>openMoadal({})}>Create Coupon</button>
                {errorDelete && <h4>Action Failed</h4>}
                {(errorDelete === 403) && <h4>Redeemed Voucher Deletion not Allowed</h4>}
                {(errorDelete === 404) && <h4>Voucher Already Removed</h4>}
            </div>

            {modalVisible && 
                  <div className="">
                  <form onSubmit={submitHandler} className="CreateCoupon_form-container">
                    <ul className="form-container">
                        <li>
                            <h2>{ id ? "Update":"Create"} Coupon</h2>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>Save Fail</div>}
                            {(errorSave === 401) && <div>Invalid Entry Encountered</div>}
                            {(errorSave === 409) && <div>Code Already Occupied</div>}
                        </li>
                        <li>
                            <label htmlFor="code">Code</label>
                            { id ?
                            <input type="text" name="code" id="code" value={code} onChange={(e) => setCode(e.target.value)}></input>
                            :
                            <input type="text" name="code" id="code" onChange={(e) => setCode(e.target.value)}
                            placeholder="To Generate Random Code Leave it Blank"></input>
                            }
                        </li>
                        <li>
                            <label htmlFor="type">Type</label>
                            <Combobox name="type" data={types} value={type} onChange={typeHandler} />
                        </li>
                        <li>
                            <label htmlFor="discount_type">Discount Type</label>
                            <Combobox name="discount_type" data={discount_types} 
                            disabled={discount? false: true} value={discount_type} onChange={value => setDiscountType(value)} />
                        </li>
                        <li>
                            <label htmlFor="redeemable_qty">Redeemable Quantity</label>
                            <input type="text" name="redeemable_qty" id="redeemable_qty" 
                            placeholder="Leave it Blank for Infinite Redemption"
                            value={redeemable_qty} onChange={(e) => setRedeemableQty(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="active">Active</label>
                            <Combobox name="active" data={[true, false]} value={active} onChange={value => setActive(value)} />
                        </li>
                        <li>
                            <label htmlFor="published">Published</label>
                            <Combobox name="published" data={[true, false]} value={published} onChange={value => setPublished(value)} />
                        </li>
                        <li className="coupon-list_li">
                            <label htmlFor="expiredAt">Expired At</label>
                            <DatePicker
                            showTimeSelect
                            name="expiredAt"
                            selected={expiredAt}
                            onChange={date => setExpiredAt(date)}
                            dateFormat="Pp"
                            placeholderText="Can be Blank"
                            />
                        </li>
                    </ul>
                    <ul className="form-container">
                        <li>
                            <label htmlFor="amount_minimum">Amount Minimum (Percent Voucher Only)</label>
                            <input type="text" name="amount_minimum" id="amount_minimum" value={amount_minimum} 
                            disabled={(discount_type === "PERCENT") ? false: true} onChange={(e) => setAmountMinimum(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="percent_off">Percent Off (Percent Voucher Only)</label>
                            <input type="text" name="percent_off" id="percent_off" value={percent_off} 
                            disabled={(discount_type === "PERCENT") ? false: true} onChange={(e) => setPercentOff(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="amount_off">Amount Off (Amount Voucher Only)</label>
                            <input type="text" name="amount_off" id="amount_off" value={amount_off} 
                            disabled={(discount_type === "AMOUNT") ? false: true} onChange={(e) => setAmountOff(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="unit_type">Unit Type (Unit Voucher Only)</label>
                            <input type="text" name="unit_type" id="unit_type" value={unit_type} 
                            disabled={(discount_type === "UNIT") ? false: true} onChange={(e) => setUnitType(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="unit_off">Number of Unit Off (Unit Voucher Only)</label>
                            <input type="text" name="unit_off" id="unit_off" value={unit_off} 
                            disabled={(discount_type === "UNIT") ? false: true} onChange={(e) => setUnitOff(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="amount">Initial Amount (Gift Voucher Only)</label>
                            <input type="text" name="amount" id="amount" value={amount} 
                            disabled={gift ? false: true} onChange={(e) => setAmount(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="balance">Current Balance (Gift Voucher Only)</label>
                            <input type="text" name="balance" id="balance" value={balance} 
                            disabled={gift ? false: true} onChange={(e) => setBalance(e.target.value)}></input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">{ id ? "Update":"Create"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={()=>setModalVisible(false)} className="button secondary">Back</button>
                        </li>
                    </ul>
                  {redemption ? redemption[0] ?
                  <div className="content-margined">
                    <div className="order-header">
                        <h3>Redemption Record</h3>
                    </div>
                    <div className="order-list">
                        <table className="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>ORIGINAL_PRICE</th>
                            <th>FINAL_PRICE</th>
                            <th>USER</th>
                            <th>EMAIL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="orderTbody">
                            {redemption.map((order) => (
                                <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>{order.itemsPrice + order.shippingPrice}</td>
                                <td>{order.totalPrice ? order.totalPrice : 0}</td>
                                <td>{order.user.name}</td>
                                <td>{order.user.email}</td>
                                <td>{order.isPaid.toString()}</td>
                                <td>{order.isDelivered}</td>
                                <td>
                                    <button>
                                    <Link className="fb" to={"/order/" + order._id} type="button">
                                    Details
                                    </Link>
                                    </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                  </div>
                  : '' : ''}
                  </form>
              </div>

        }
          

            <div className="coupon-list_div__Content">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Redeemed Quantity</th>
                            <th>Active</th>
                            <th>Published</th>
                            <th>Expired At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {coupons ? coupons.map(coupon => (<tr key={coupon._id}>
                            <td>{coupon._id}</td>
                            <td>{coupon.code}</td>
                            <td>{coupon.type}</td>
                            <td>{coupon.redeemed_qty}</td>
                            <td>{coupon.active ? "true" : "false"}</td>
                            <td>{coupon.published ? "true" : "false"}</td>
                            <td>{coupon.expiredAt ? new Date(coupon.expiredAt).toLocaleString() : "Never"}</td>
                            <td><Button className="button" onClick={()=>openMoadal(coupon)} >Edit</Button>
                                <Button className="button" onClick={() => deleteHandler(coupon)}>Delete</Button></td>
                        </tr>
                        )):<tr/>}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default CouponsScreen;