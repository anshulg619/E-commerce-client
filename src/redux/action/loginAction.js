import * as actionTypes from '../constant/authConstants'
import axios from 'axios'

const url = 'https://e-commerce-backend-fkq1.onrender.com';

export  const userLogin = (loginData) => async (dispatch) => {
    try {
        const {data} = await axios.post(`${url}/flipkart/login`, loginData);
        dispatch({type:actionTypes.USER_LOGIN, payload:data})
    } catch (error) {
        console.log({message:error.message})   
    }
}

export  const adminLogin = (loginData) => async (dispatch) => {
    try {
        const {data} = await axios.post(`${url}/flipkart/adminLogin`, loginData);
        dispatch({type:actionTypes.ADMIN_LOGIN, payload:data})
    } catch (error) {
        console.log({message:error.message})   
    }
}

export const userLogout =() => (dispatch) =>{
    dispatch({type:actionTypes.USER_LOGOUT})
}

export const adminLogout =() => (dispatch) =>{
    dispatch({type:actionTypes.ADMIN_LOGOUT})
}