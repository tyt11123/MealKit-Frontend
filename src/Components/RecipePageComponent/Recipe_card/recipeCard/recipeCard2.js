import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCardUi from './recipeCardUi';
import { listProducts } from '../../../../Redux/Actions/productActions';
import './recipeCard2.css';


const Cards = (props) => {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const temp1 = [];
    if (products) {
    if (products[0]) {shuffle(products); temp1[0]=products[0];};
    if (products[1]) {temp1[1]=products[1];} else {temp1[1]=products[0]};
    if (products[2]) {temp1[2]=products[2];} else {temp1[2]=products[0]};
    if (products[3]) {temp1[3]=products[3];} else {temp1[3]=products[0]};
    if (products[4]) {temp1[4]=products[4];} else {temp1[4]=products[0]};
    if (products[5]) {temp1[5]=products[5];} else {temp1[5]=products[0]};
    };
    const dispatch = useDispatch();

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
    };

    useEffect(() => {
        dispatch(listProducts());
        return () => {
        };
    }, []);

    return (
        <div className="show_RecipCard_outtaBox">
                {loading && <div className="col-sm-4 col-md-4 col-lg-4">Loading...</div>}
                {error && <div className="col-sm-4 col-md-4 col-lg-4">{error}</div>}
                {temp1[0] ?
                temp1.map((product, index) => <div key={index} className=" recipeCard__outtaBox">
                    <RecipeCardUi name={product.name}
                    _id={product._id}
                    image={product.image[0]}
                    description={product.description}
                    countInStock={product.countInStock}
                    />
                </div>)
                :"Preparation in progress..."}
            
        </div>
    );
}
export default Cards;