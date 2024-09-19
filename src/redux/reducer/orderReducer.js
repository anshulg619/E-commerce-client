import * as actionTypes from '../constant/orderConstant'


export  const orderReducer = (state = {order : []}, action) => {
    switch(action.type){
        case actionTypes.GET_ORDERS:
            return {order: action.payload}
        default:
            return state;    
    }
    }