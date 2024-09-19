import * as actionTypes from '../constant/listConstants';
export  const listReducer = (state = {savedItems : []}, action) => {
switch(action.type){
    case actionTypes.ADD_TO_LIST:
        const item = action.payload;

        const itemExists = state.savedItems.find(product => product._id === item._id)

        if(itemExists){
            return {...state,savedItems:state.savedItems.map( x => x.product === itemExists.product ? item:x) }
        }else{
            return{...state, savedItems:[...state.savedItems, item]}
        }

    case actionTypes.REMOVE_FROM_LIST:
        return{
            ...state, savedItems:state.savedItems.filter(product => product._id !== action.payload)
        }  

    case actionTypes.LIST_RESET:
        return {savedItems:[]}    
        
    default:
        return state;    
}
}