import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyCoupon, emailCoupon, } from "../Redux/Actions/CouponActions";
import { fulllist, } from "../Redux/Actions/userActions";
import SelectList from 'react-widgets/lib/SelectList';

function PublishScreen(props) {
  const [code, setCode] = useState('');
  const couponVerify = useSelector((state) => state.couponVerify);
  const { loading: loadingCoupon, success: successCoupon, error: errorCoupon, coupon } = couponVerify;
  const dispatch = useDispatch();
  const userFullList = useSelector((state) => state.userFullList);
  const { loading: loadingList, success: successList, error: errorList, userlist } = userFullList;
  const couponEmail = useSelector((state) => state.couponEmail);
  const { loading: loadingEmail, success: successEmail, error: errorEmail } = couponEmail;
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [attempted, setAttempted] = useState(false);
  if (userlist) {
    for (let i = 0; i < userlist.length; i++) {
      userlist[i].display = `${userlist[i].name} (${userlist[i].email})`
    };
  };

  const couponHandler = (e) => {
    e.preventDefault();
    dispatch(verifyCoupon(code));
    setAttempted(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setAttempted(true);
    if (list.length) {
      setChecked(true);
      let name = list.map(x=>x.name);
      let email = list.map(x=>x.email);
      dispatch(emailCoupon(code, name, email));
    } else {
      setChecked(false);
    };
  };

  useEffect(() => {
    dispatch(fulllist());
    return () => {

    }
  }, []);

  return (
    <div className="content-margined">
      <div className="placeorder-action">
        <h3>Dispatch Coupon to Users By Email</h3>
        <form onSubmit={couponHandler}>
          <label htmlFor="code">Enter The Voucher Code to Publish:&nbsp;</label>
          <input type="text" name="code" onChange={(e)=>setCode(e.target.value)}></input>
          &nbsp;
          <button type="submit">Check</button>
          <div>
          { loadingCoupon && "Loading..." }
          { successCoupon ?
          coupon.valid ? 
          !(coupon.published) ?
          (<div>
          {coupon.balance ? `Current Gift Card Balance: $${coupon.balance}` : ""}
          {coupon.amount_off ? `One-time Amount Off: $${coupon.amount_off}` : ""}
          {coupon.percent_off ? `${coupon.percent_off}% Discount` : ""}
          {coupon.unit_type ? `${coupon.unit_type} Waiver` : ""}
          </div>)
          : `Coupon Already Dispatched to Customer`
          : "Coupon Invalid"
          : "" }
          { errorCoupon && "Coupon Verification Failure"}
          </div>
        </form>
      </div>
      <div className="placeorder-action">
          { loadingCoupon && "Loading..." }
          { errorCoupon && "Coupon Verification Failure"}
          { successCoupon ?
          coupon.valid ? 
          !(coupon.published) ?
          (<div>
            <form onSubmit={submitHandler}>
            <label className="filterInput_label">Select User</label>
            {userlist ?
              <>&nbsp;
              <button className="btn-lg btn-warning"
              onClick={(e)=>{e.preventDefault();setList(userlist);}}>
               Select all
              </button>
              <SelectList
              className="category_div"
              multiple
              data={userlist}
              textField='display'
              value={list}
              onChange={e => setList(e)}
               />
              <button type="submit" className="btn-lg btn-warning">
               Dispatch by Email
              </button>
              {attempted && !(checked) && <div>Nothing selected!</div>}
              </>
             :<SelectList busy />}
            </form>
            { loadingEmail && "It Takes 20 seconds to Finish 1 Email, so Please be Patient..." }
            { successEmail && "Finished!" }
            { errorEmail && "Request Failed"}
          </div>)
          : ""
          : ""
          : "" }
      </div>
    </div>
  );
}

export default PublishScreen;
