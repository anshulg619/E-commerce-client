import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {getProductReducer, getProductDetailsReducer} from './reducer/productReducer';
import { cartReducer } from './reducer/cartReducer';
import { listReducer } from './reducer/listReducer';
import { authReducer, adminReducer } from './reducer/authReducer';
import { orderReducer } from './reducer/orderReducer';
import { getCategoriesReducer } from './reducer/categoryReducer';



const reducer = combineReducers({
    getProducts:getProductReducer,
    getProductDetails:getProductDetailsReducer,
    cart:cartReducer,
    list:listReducer,
    user:authReducer,
    admin:adminReducer,
    order:orderReducer,
    categories: getCategoriesReducer

})


const persistConfig = {
    key: 'root', // Key for the persisted state
    storage, // Storage engine (localStorage in this case)
    blacklist: ['getProducts', 'getProductDetails', 'order','categories'], // Exclude these reducers from persistence
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);



const middleware = [thunk];


const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))

)

const persistor = persistStore(store);

export { store, persistor };
