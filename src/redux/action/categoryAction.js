import axios from "axios"
import * as actionTypes from '../constant/categoryConstants'

const url = 'https://e-commerce-backend-fkq1.onrender.com';
export const getAllCategoriesAction = (token) => async (dispatch) => {
    try {
        const {data} = await axios.get(`${url}/flipkart/category/getAllCategories`, {headers:{'Authorization':`Bearer ${token}`}})
        dispatch({type:actionTypes.GET_ALL_CATEGORIES, payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

