import * as actionTypes from '../constant/categoryConstants'

export const getCategoriesReducer = (state={categories:[]}, action) => {
    switch(action.type){
        case actionTypes.GET_ALL_CATEGORIES:
            return {categories: action.payload}
        default:
            return state;    
    }
}