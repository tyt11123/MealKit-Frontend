import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_MENU_REQUEST, PRODUCT_MENU_SUCCESS, PRODUCT_MENU_FAIL,
    PRODUCT_CAROUSEL_LOAD_REQUEST, PRODUCT_CAROUSEL_LOAD_SUCCESS, PRODUCT_CAROUSEL_LOAD_FAIL,
    PRODUCT_CAROUSEL_SAVE_REQUEST, PRODUCT_CAROUSEL_SAVE_SUCCESS, PRODUCT_CAROUSEL_SAVE_FAIL,
} from '../Constants/productConstants'
import axios from 'axios';

const listProducts = (category='', type='', searchKeyword='', sortOrder='') => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get( process.env.REACT_APP_API_SERVER + "/api/products?category=" + category + "&type=" + type + "&searchKeyword=" + searchKeyword + "&sortOrder=" + sortOrder
        ,{
            headers: {
                'Authorization': userInfo ? 'Bearer ' + userInfo.token : ''
            }
        });
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }

}
//save Product
const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product })
        const { userSignin: { userInfo } } = getState();
        if (!product._id) {
            const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/products`, product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data })
        }
        else {
            const { data } = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/products/` + product._id , product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data })
        }
       
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message })
    }
}
//17/check product route have both post and put mehtod, with message in return 

const detailsProduct = (productId) => async (dispatch, getState) => {
    console.log(productId);
    try {
        // console.log(productId);
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/products/` + productId, {
            headers: {
                'Authorization': userInfo ? 'Bearer ' + userInfo.token : ''
            }
        });
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message })
    }
}

const deleteProduct = (productId) => async (dispatch,getState) => {
    
    try {
    const { userSignin: { userInfo } } = getState();
    console.log(productId);
   
        // console.log(productId);
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId })
        const { data } = await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/products/` + productId, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data,success:true })
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
    }
}

// product menu at landing page
const menuProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_MENU_REQUEST });
        const { data } = await axios.get( process.env.REACT_APP_API_SERVER + "/api/products/menu");
        dispatch({ type: PRODUCT_MENU_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: PRODUCT_MENU_FAIL, payload: error.message })
    }
};

const carouselLoadProducts = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: PRODUCT_CAROUSEL_LOAD_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/products/landingpage`, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: PRODUCT_CAROUSEL_LOAD_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: PRODUCT_CAROUSEL_LOAD_FAIL, payload: error.message })
    }
}

const carouselSaveProducts = (products) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: PRODUCT_CAROUSEL_SAVE_REQUEST, payload: products });
        const { data } = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/products/landingpage`, {products}, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: PRODUCT_CAROUSEL_SAVE_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: PRODUCT_CAROUSEL_SAVE_FAIL, payload: error.message })
    }
}

export { listProducts, detailsProduct, saveProduct,deleteProduct, menuProduct,
    carouselLoadProducts, carouselSaveProducts, } 