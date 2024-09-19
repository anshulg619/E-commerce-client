import axios from 'axios';

import * as actionTypes from '../constant/cartConstants'

const url = 'https://e-commerce-backend-fkq1.onrender.com';

export const addToCart = (id, quantity) => async (dispatch) => {
    
    try {
        const {data} = await axios.get(`${url}/flipkart/product/${id}`);
        dispatch({type:actionTypes.ADD_TO_CART, payload:{...data, quantity}});
    } catch (error) {
        console.log('error while loading addtoCart api')
    }
    
} 

export const userCartAction = (id, token) => async (dispatch) => {
    try {
        const {data} = await axios.get(`${url}/flipkart/cart/getItems/${id}`,{headers:{'Authorization':`Bearer ${token}`}})
        console.log(data.products);
        dispatch({type:actionTypes.USER_CART,payload: data.products})        
    } catch (error) {
        console.log(error.message)
    }
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({type:actionTypes.REMOVE_FROM_CART, payload:id})
}

export const resetCart = () => (dispatch) => {
    dispatch({type:actionTypes.CART_RESET})
}