import * as actionTypes from '../constant/cartConstants';

export  const cartReducer = (state = {cartItems : []}, action) => {
switch(action.type){
    case actionTypes.ADD_TO_CART:
        const item = action.payload;

        const itemExists = state.cartItems.find(product => product._id === item._id)

        if(itemExists){
            return {...state,cartItems:state.cartItems.map( x => x.product === itemExists.product ? item:x) }
        }else{
            return{...state, cartItems:[...state.cartItems, item]}
        }

    case actionTypes.REMOVE_FROM_CART:
        return{
            ...state, cartItems:state.cartItems.filter(product => product._id !== action.payload)
        }  

    case actionTypes.CART_RESET:
        return {cartItems:[]}   

    case actionTypes.USER_CART:{
        return {...state,cartItems:[...action.payload]}
    }    
        
    default:
        return state;    
}
}