import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import ProDetailSlice from "./slices/ProDetailSlice";
import orderSlice from "./slices/ordersSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import orderDetailsSlice from "./slices/orderDetailsSlice";
import newProductSlice from "./slices/newProductSlice";
import wishListSlice from "./slices/wishListSlice";
const store = configureStore({
  reducer: {
    productReducer: productsSlice,
    productDetailReducer: ProDetailSlice,
    userReducer: userSlice,
    cartReducer: cartSlice,
    ordersReducer: orderSlice,
    orderDetailsReducer: orderDetailsSlice,
    newProductReducer:newProductSlice,
    wishListReducer:wishListSlice
  }
})
export default store;
