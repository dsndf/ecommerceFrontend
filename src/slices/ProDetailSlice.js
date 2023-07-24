import { createSlice } from "@reduxjs/toolkit"
import { setStatus, STATUS } from "./productsSlice";

import axios from 'axios'
const initialState = {
    product: {},
    status: "idle",
    isReviewed: false,
    productReviews: [],
    isReviewDeleted: false,
    err: "",
    isUpdated: false
}

const server=process.env.REACT_APP_BACKEND_URL;
const ProductDetailSlice = createSlice({

    name: "productDetail",
    initialState,

    reducers: {

        setProductReviews(state, action) {
            state.productReviews = action.payload;
        }
        ,
        setIsRevieweDeleted(state, action) {
            state.isReviewDeleted = action.payload;
        }
        ,

        setProductDetails(state, action) {
            state.product = action.payload;
        },
        setDetailsStatus(state, action) {
            state.status = action.payload;
        }
        ,
        setIsReviewed(state, action) {
            state.isReviewed = action.payload;
        }
        ,
        setProductDetailsError(state, action) {
            state.err = action.payload;
        },
        setIsUpdated(state, action) {
            state.isUpdated = action.payload;
        }

    }

});

export const { setIsRevieweDeleted, setProductReviews, setIsReviewed, setIsUpdated, setProductDetailsError, setProductDetails, setDetailsStatus } = ProductDetailSlice.actions;

//thunk for get Reviews of  product

export function getProductReviews(ProId) {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {

            const { data } = await axios.get(`${server}/admin/product/reviews?productId=${ProId}`,{withCredentials:true});
            dispatch(setProductReviews(data.reviews));
            dispatch(setStatus(STATUS.IDLE));


        }
        catch (err) {
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setProductDetailsError(err.response.data.message));
        }

    }

}
//thunk for review deletion 
export function deleteProductReview(ProId,userId) {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {
        
 console.log(ProId,userId);
            const { data } = await axios.delete(`${server}/admin/review?productId=${ProId}&user=${userId}`,{withCredentials:true});
            dispatch(setIsRevieweDeleted(data.success));
            dispatch(setStatus(STATUS.IDLE));

        }
        catch (err) {
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setProductDetailsError(err.response.data.message));
        }

    }

}



//THUNK MIDDLEWARE

export function fetchProductDetails(id) {

    return async (dispatch, getState) => {

        dispatch(setDetailsStatus(STATUS.LOADING));

        try {

            const data = await (await fetch(`${server}/product/${id}`)).json();

            if (!data.succes) {
                throw new Error(data.message);
            }

            dispatch(setProductDetails(data.product));

            dispatch(setDetailsStatus(STATUS.IDLE));


        }
        catch (err) {

            dispatch(setDetailsStatus(STATUS.ERROR));
            dispatch(setProductDetailsError(err.response.data.message));
        }


    }


}

export function productReview(myReview, id) {
    return async (dispatch, getState) => {
        try {

            const { data } = await axios.put(`${server}/review/product/${id}`, myReview,{withCredentials:true});

            dispatch(setIsReviewed(true));

        }
        catch (err) {
            dispatch(setDetailsStatus(STATUS.ERROR));
            dispatch(setProductDetailsError(err.response.data.message));
        }




    }



}


// thunk to update product

export function updateProduct(id, myform) {

    return async (dispatch, getState) => {
        dispatch(setDetailsStatus("loading"));
        try {
            const config = {
                withCredentials:true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await axios.put(`${server}/product/${id}`, myform, config);

            dispatch(setIsUpdated(true));
            dispatch(setProductDetails(data.message));
            dispatch(setDetailsStatus("idle"));


        }
        catch (err) {
            dispatch(setProductDetailsError(err.response.data.message));
        }

    }

}

export default ProductDetailSlice.reducer;