import axios from 'axios';

import * as actionTypes from '../constant/listConstants'
const url = 'https://e-commerce-backend-fkq1.onrender.com';

export const addToList = (id) => async (dispatch) => {
    
    try {
        const {data} = await axios.get(`${url}/flipkart/product/${id}`);
        dispatch({type:actionTypes.ADD_TO_LIST, payload:{...data}});
    } catch (error) {
        console.log('error while loading addtoCart api')
    }
    
} 

export const removeFromList = (id) => (dispatch) => {
    dispatch({type:actionTypes.REMOVE_FROM_LIST, payload:id})
}