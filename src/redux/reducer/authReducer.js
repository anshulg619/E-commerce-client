import * as actionTypes from '../constant/authConstants'

export  const authReducer = (state = {user : {}}, action) => {
    switch(action.type){
        case actionTypes.USER_LOGIN:
            return {user: action.payload}
    
        case actionTypes.USER_LOGOUT:
            return {user:{}}  
        default:
            return state;    
    }
    }


export const adminReducer = (state = {admin : {}}, action) => {
    switch(action.type){
        case actionTypes.ADMIN_LOGIN:
            return {admin:action.payload}
        
        case actionTypes.ADMIN_LOGOUT:
                return {admin:{}}
        default:
            return state;    
    }
    }