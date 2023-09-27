import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./productsSlice";

import axios from "axios";

const initialState = {
  order: {},
  status: "idle",
  err: "",
  isOrderUpdated: false
};
const server=process.env.REACT_APP_BACKEND_URL;

const orderDetailsSlice = createSlice({
  initialState,
  name: "orderDetails",
  reducers: {
    setOrderDetails(state, action) {
      state.order = action.payload;
    },
    setOrderStatus(state, action) {
      state.status = action.payload;
    },
    setOrderError(state, action) {
      state.err = action.payload;
    },
    setIsOrderUpdated(state, action) {
      state.isOrderUpdated = action.payload;
    }
  },
});

export const { setIsOrderUpdated, setOrderDetails, setOrderError, setOrderStatus } = orderDetailsSlice.actions;
//thunk middleware for order details


export function getOrderDetails(id) {
  return async (dispatch, getState) => {

    dispatch(setOrderStatus(STATUS.LOADING));
    try {
      console.log(id);
      const { data } = await axios.get(`${server}/order/${id}`,{withCredentials:true});

      dispatch(setOrderDetails(data.order));
      dispatch(setOrderStatus(STATUS.IDLE));

    }
    catch (err) {
    dispatch(setOrderStatus(STATUS.ERROR)) ;
      dispatch(setOrderError(err.response.data.message));
    }


  }



}

export function updateOrderStatus(orderId,orderStatus) {

  return async (dispatch, getState) => {
dispatch(setOrderStatus(STATUS.LOADING))

    try {
      const { data } = await axios.put(`${server}/admin/order/${orderId}`,{status:orderStatus},{withCredentials:true} );

      dispatch(setIsOrderUpdated(true));
      dispatch(setOrderDetails(data.order));
      dispatch(setOrderStatus(STATUS.IDLE))

    }

    catch (err) {
      dispatch(setOrderStatus(STATUS.ERROR));   
      dispatch(setOrderError(err.response.data.message));
    }

  }

}
export default orderDetailsSlice.reducer
