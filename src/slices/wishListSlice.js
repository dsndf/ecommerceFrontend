import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishList: localStorage.wishList ? JSON.parse(localStorage.wishList) : [],

}


const wishListSlice = createSlice({
    initialState,
    name: "wishList",
    reducers: {

        setwishList(state, action) {
            if (state.wishList.find((v) => {
                return v.product === action.payload.product;
            })){
               return;
            }


                state.wishList = [...state.wishList, action.payload];
            localStorage.setItem("wishList", JSON.stringify(state.wishList));
        }
        ,
        removewishListItems(state, action) {

            state.wishList = state.wishList.filter((v) => {
                return v.product !== action.payload;
            })
            localStorage.setItem("wishList", JSON.stringify(state.wishList));


        }

    }
});
export const { setwishList, removewishListItems } = wishListSlice.actions;
export default wishListSlice.reducer;