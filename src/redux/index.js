import { configureStore, createSlice } from '@reduxjs/toolkit';
import { adminReducer } from './reducers/adminReducer';
import { cartReducer } from './reducers/cartReducer';
import { orderReducer, ordersReducer } from './reducers/orderReducer';



const authSlice = createSlice({
    name : "auth",
    initialState: {isLoggedIn:false},
    reducers : { 
    login(state){
        state.isLoggedIn= true;
    },
    logout(state){
        state.isLoggedIn= false;
    }
    }
})

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: 
    {
    auth: authSlice.reducer,
    cart: cartReducer,
    order:orderReducer,
    orders:ordersReducer,
    admin:adminReducer
    }
});
