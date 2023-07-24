
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { setStatus, STATUS } from './productsSlice';

const server=process.env.REACT_APP_BACKEND_URL;


const initialState = { 
   orders: [],
   isOrderPlaced: false,
   status: "idle",
   err: "",
   allOrders: [],
   isOrderDeleted:false

}

const ordersSlice = createSlice({
   initialState,
   name: "orders",
   reducers: {

      setOrder(state, action) {
         state.orders = [...action.payload];
      }
      ,
      setIsOrderPlaced(state, action) {
         state.isOrderPlaced = action.payload;
      }
      ,
      setOrdersError(state, action) {
         state.err = action.payload;
      },
      setOrdersStatus(state, action) {
         state.status = action.payload;
      },
      setAllOrders(state, action) {
         state.allOrders = action.payload;
      },

      setIsOrderDeleted(state,action){
        state.isOrderDeleted = action.payload;

      }
   }


});

export const { setIsOrderDeleted, setAllOrders, setOrder, setIsOrderPlaced, setOrdersError, setOrdersStatus } = ordersSlice.actions;

// thunk middleware to place an order

export function placeOrder(order) {

   return async (dispatch, getState) => {
      try {
         const { data } = await axios.post(`${server}/order/new`, order,{withCredentials:true});
         dispatch(setIsOrderPlaced(true));
      }
      catch (err) {
         dispatch(setIsOrderPlaced(false));
         dispatch(setOrdersError(err.response.data.message));
      }
   }

}

export function myOrders() {

   return async (dispatch, getState) => {
      dispatch(setOrdersStatus(STATUS.LOADING));
      try {
         const { data } = await axios.get(`${server}/orders/me`,{withCredentials:true});
         console.log("my orders", data)
         dispatch(setOrder(data.order));
         dispatch(setOrdersStatus(STATUS.IDLE));


      }
      catch (err) {
         dispatch(setOrdersStatus(STATUS.ERROR));
         dispatch(setOrdersError(err.response.data.message));
      }
   }

}
//thunk get admin all orders
export function getAllOrders() {

   return async (dispatch, getState) => {
      dispatch(setOrdersStatus(STATUS.LOADING));
      try {

         const { data } = await axios.get(`${server}/admin/orders`,{withCredentials:true});
         dispatch(setAllOrders(data.orders));
         dispatch(setOrdersStatus(STATUS.IDLE));
      }

      catch (err) {
         dispatch(setOrdersError(err.response.data.message));
      }

   }
}

// thunk to delete order

export function deleteOrder(orderId){

return async (dispatch,getState)=>{
try{
const {data} = await axios.delete(`${server}/admin/order/${orderId}`,{withCredentials:true});
console.log(data);
if(data.success){
   dispatch(setIsOrderDeleted(true));
}
}
catch(err){
      dispatch(setOrdersError(err.response.data.message));
}




}


}

   export default ordersSlice.reducer;