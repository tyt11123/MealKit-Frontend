import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { savePlan, listPlan, } from "../Redux/Actions/planActions";

function BundleScreen(props) {
    const dispatch = useDispatch();

    const planCreate = useSelector(state => state.planCreate);
    const { loading, success, error } = planCreate;
    const planList = useSelector(state => state.planList);
    const { bulkQty, bulkAmount, bulkCeiling, loading: loadingList, 
        success: successList, error: errorList } = planList;
    const [newQty, setNewQty] = useState([]);
    const [newAmount, setNewAmount] = useState([]);
    const [newCeiling, setNewCeiling] = useState([]);

    useEffect(() => {
        dispatch(listPlan());
        return () => {};
    },[success]);

    useEffect(() => {
        setNewQty(bulkQty);
        setNewAmount(bulkAmount);
        setNewCeiling(bulkCeiling);
        return () => {};
    },[successList]);

    const addEntry = () => {
        setNewQty(oldArray => [...oldArray, '']);
        setNewAmount(oldArray => [...oldArray, '']);
        setNewCeiling(oldArray => [...oldArray, '']);
    };

    const putQty = (index, qty) => {
        newQty.splice(index, 1, Number(qty));
        setNewQty([...newQty]);
    };

    const putAmount = (index, amount) => {
        newAmount.splice(index, 1, Number(amount));
        setNewAmount([...newAmount]);
    };

    const putCeiling = (index, ceiling) => {
        newCeiling.splice(index, 1, Number(ceiling));
        setNewCeiling([...newCeiling]);
    };

    const submitPlanHandler = (e) => {
        e.preventDefault();
        dispatch(savePlan(newQty, newAmount, newCeiling));
        // console.log(bulkQty, bulkAmount, bulkCeiling, newQty, newAmount, newCeiling);
    };

    const removeHandler = (e, index) => {
        e.preventDefault();
        newQty.splice(index, 1);
        newAmount.splice(index, 1);
        newCeiling.splice(index, 1);
        setNewQty([...newQty]);
        setNewAmount([...newAmount]);
        setNewCeiling([...newCeiling]);
    };

    return <div>
        { errorList ?
        <h4 className="content-margined">{errorList}</h4>:
        <div className="content-margined">
        <div className="product-header">
            <h1>Bundle Plans</h1>
            <button className="btn" onClick={()=>addEntry()}>Create New Plan</button>
            {loading && <h4>Saving...</h4>}
            {error && <h4>Save Fail</h4>}
            {loadingList && <h4>Loading...</h4>}
        </div>
        <form onSubmit={submitPlanHandler}>
        <div className="product-list_div__Content">
            <table className="table">
                <thead>
                    <tr>
                        <th>Number of Dishes</th>
                        <th>Amount</th>
                        <th>Exclude Every Product Above..</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {newQty[0] !== null ? 
                    newQty.map((x,index) => (<tr key={index}>
                        <td>
                        <input
                        placeholder="Quantity"
                        type="text"
                        name="quantity"
                        value={x}
                        onChange={(e) => putQty(index, e.target.value)}/>
                        </td>
                        <td>
                        $<input
                        placeholder="Amount"
                        type="text"
                        name="amount"
                        value={newAmount[index]}
                        onChange={(e) => putAmount(index, e.target.value)}/>
                        </td>
                        <td>
                        $<input
                        placeholder="Ceiling Amount"
                        type="text"
                        name="ceiling"
                        value={newCeiling[index]}
                        onChange={(e) => putCeiling(index, e.target.value)}/>
                        </td>
                        <td>
                        <button onClick={(e)=>removeHandler(e, index)}>Delete</button>
                        </td>
                    </tr>
                    )):<tr/>}
                </tbody>
            </table>
        </div>
        <div className="product-header">
            <button type="submit" className="btn">Submit</button>
        </div>
        </form>
        </div>
        }
        </div>;
}

export default BundleScreen;