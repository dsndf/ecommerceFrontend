import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
cart: localStorage.cart?JSON.parse(localStorage.cart):[],
shippingInfo: localStorage.shippingInfo?JSON.parse(localStorage.shippingInfo):{}
}


const cartSlice = createSlice({
initialState,
name:"cart",
reducers:{

setCart(state,action){
    state.cart = [...state.cart,action.payload];
    localStorage.setItem("cart",JSON.stringify(state.cart));
}
,
setCartItemQuantity(state,action){

    state.cart = state.cart.map((v)=>{
        if(v.product === action.payload.id){
            v.quantity = action.payload.quantity;
        }
        return v;
    });
    localStorage.setItem("cart",JSON.stringify(state.cart));

}
 ,
 removeCartItems(state,action){

    state.cart = state.cart.filter((v)=>{
        return v.product!==action.payload;
    })
    localStorage.setItem("cart",JSON.stringify(state.cart));


 },
 setShippingInfo(state,action){
    state.shippingInfo = action.payload;
    localStorage.setItem("shippingInfo",JSON.stringify(state.shippingInfo));

 }

}
});
export const {setCart,setCartItemQuantity,removeCartItems,setShippingInfo} = cartSlice.actions;
export default cartSlice.reducer;