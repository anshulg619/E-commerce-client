

import axios from 'axios'
import * as actionTypes from '../constant/orderConstant'

const url = 'https://e-commerce-backend-fkq1.onrender.com';


export const  getOrdersAction = (token) =>  async (dispatch) => {   
   try {
    const {data} = await axios.get(`${url}/flipkart/order/getOrders`,{headers:{'Authorization':`Bearer ${token}`}})
    dispatch({type: actionTypes.GET_ORDERS,payload:data})
   } catch (error) {
    console.log(error.message);    
   }        
}