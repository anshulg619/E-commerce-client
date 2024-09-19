import axios from 'axios';
import * as actionTypes from '../constant/productConstants'

const url = 'https://e-commerce-backend-fkq1.onrender.com';

export const getProducts = () => async (dispatch) =>{
    try{
        const {data} = await axios.get(`${url}/flipkart/products`);
        console.log(data);
        dispatch({type:actionTypes.GET_PRODUCTS_SUCCESS, payload:data});
    }catch(error){
        dispatch({type:actionTypes.GET_PRODUCTS_FAIL, payload:error.response})
    }
}

export const getProductDetail = (id) => async(dispatch) =>{
    try {
        dispatch({type:actionTypes.GET_PRODUCT_DETAILS_REQUEST});
        console.log('inside actiom')
        const {data} = await axios.get(`${url}/flipkart/product/${id}`);
        console.log(data)
        dispatch({type:actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:actionTypes.GET_PRODUCT_DETAILS_FAIL, payload:error.response})
    }
}

export const resetProductDetail = () => (dispatch) =>{
    dispatch({type:actionTypes.GET_PRODUCT_DETAILS_RESET,payload:null})
}