import axios from 'axios';


const url = 'https://e-commerce-backend-fkq1.onrender.com/flipkart';

const addNewUser = async (data) => {
    return await axios.post(`${url}/saveUser`, data,{headers:{'Content-Type':'multipart/form-data'}} )
}

const addNewAdmin = async (data) => {
    return await axios.post(url+'/saveAdmin', data, {headers:{'Content-Type':'multipart/form-data'}})
}

// const getUser = async (loginData) => {
//     return await axios.post(url+'/login',loginData);
// }

const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${url}/payment`, data);
        return response.data;
    } catch (error) {
        console.log('Error', error);
    }
}

const saveOrder = async (data,token)=> {
    return await axios.post(url+'/order/save', data,{headers:{'Authorization':`Bearer ${token}`}} )
}


const saveProduct = async (data,token) => {
    return await axios.post(url+'/product/save', data, {headers:{'Authorization':`Bearer ${token}`}})
} 

const addReview = async (review,token) => {
    return await axios.put(url+'/product/addReview', review,{headers:{'Authorization':`Bearer ${token}`}})
}

const addCategory = async (data,token) => {
    return await axios.post(url+'/category/create', data, {headers:{'Authorization':`Bearer ${token}`}})
} 

const deleteCategory = async (id, token) => {
    return await axios.delete(url+`/category/delete/${id}`, {headers:{'Authorization':`Bearer ${token}`}})
}


const saveCartItems = async (data,token) => {
    return await axios.post(url+'/cart/save', data,{headers:{'Authorization':`Bearer ${token}`}})
}

const removeProduct = async (data,token) => {
    return await axios.put(url+'/cart/delete', data,{headers:{'Authorization':`Bearer ${token}`}})
}

// eslint-disable-next-line
export default {addNewUser,payUsingPaytm, saveOrder,saveCartItems,removeProduct,
    addNewAdmin,saveProduct, addReview, addCategory, deleteCategory}