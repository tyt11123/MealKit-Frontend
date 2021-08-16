import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { carouselLoadProducts, carouselSaveProducts, } from '../Redux/Actions/productActions';

const CarouselScreen = (props) => {
    const productCarousel = useSelector(state => state.productCarousel);
    const { loading, products, error } = productCarousel;
    const productCarouselSave = useSelector(state => state.productCarouselSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productCarouselSave;
    const [landingPage, setLandingPage] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(carouselLoadProducts());
        return () => {
            // cleanup
        };
    }, [successSave])

    useEffect(() => {
        setLandingPage(products.map(x=>x.landingPage));
        return () => {
            // cleanup
        };
    }, [products])

    const submitHandler = (e) => {
        e.preventDefault();
        let payload = products.map((x,index)=>Object.assign({_id: x._id, landingPage: landingPage[index]}));
        dispatch(carouselSaveProducts(payload));
    }

    return (
        <div className="content-margined">
            <div className="product-header">
                <h1>Products</h1>
                <button className=" btn" onClick={submitHandler}>Save</button>
                {loading && <h4>Loading...</h4>}
                {loadingSave && <h4>Saving...</h4>}
                {successSave && <h4>Saved Successfully!</h4>}
                {error && <h4>{error}</h4>}
                {errorSave && <h4>{errorSave}</h4>}
            </div>

            <div className="product-list_div__Content">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            {/* <th>Image</th> */}
                            <th>Landing Page</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products ? products.map((product, index) => (<tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            {/* <td>{product.image[0]}</td> */}
                            <td>
                                <input type="checkbox" defaultChecked={product.landingPage} 
                                onChange={(e)=>{
                                    landingPage.splice(index, 1, e.target.checked);
                                    setLandingPage([...landingPage]);
                                }}/>
                            </td>
                        </tr>
                        )):<tr/>}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default CarouselScreen;