import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const STATUS =  Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "erorr"
})
const server=process.env.REACT_APP_BACKEND_URL;

const initialState = {
  products: [],
  counts: 0,
  resultPerPage: 0,
  status: "idle",
  err: "",
  availableProducts: 0,
  

  allProducts: [],
  isDeleted:false
}


const productsSlice = createSlice({
  initialState,
  name: "products",

  reducers: {
  setIsDeleted(state,action){
    state.isDeleted = action.payload;
  },
    setProducts(state, action) {
      state.products = action.payload;
    }
    ,
    setStatus(state, action) {
      state.status = action.payload;
    }
    ,
    setError(state, action) {
      state.err = action.payload;
    }
    ,

    setProductsCount(state, action) {
      state.counts = action.payload;

    },
    setResultPerPage(state, action) {
      state.resultPerPage = action.payload;
    },

    setAvailableProducts(state, action) {
      state.availableProducts = action.payload;
    }
    ,

    setAllProducts(state, action) {
      state.allProducts = action.payload;
    }

  }


});


export const { setProducts,setIsDeleted, setStatus, setAllProducts, setProductsCount, setError, setResultPerPage, setAvailableProducts } = productsSlice.actions;
//thunk middleware

export function fetchProducts(keyword = "", currentPage=1, price=[0,4000], category = "", ratings = 0,sortBy="") {



  return async (dispatch, getState) => {

    dispatch(setStatus(STATUS.LOADING));
    try {
      let url =`${server}/products?name=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}&sort=${sortBy}`;
      if (category) {
        url =`${server}/products?name=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}&sort=${sortBy}&category=${category}`;

      }

      const {data} = await axios.get(url) ;
      

      dispatch(setProductsCount(data.counts));
      dispatch(setResultPerPage(data.resultPerPage));
      dispatch(setProducts(data.products));
      dispatch(setAvailableProducts(data.availableproducts));
      dispatch(setStatus(STATUS.IDLE));

    }
    catch (err) {
      dispatch(setStatus(STATUS.ERROR));
      dispatch(setError(err.response.data.message));
    }


  }


}

// thunk for admin all products

  
 export function getAdminProducts() {

  return async (dispatch, getState) => {

    dispatch(setStatus(STATUS.LOADING));
    try {

      const { data } = await axios.get(`${server}/admin/all/products`,{withCredentials:true});

      dispatch(setAllProducts(data.allProducts));
      dispatch(setStatus(STATUS.IDLE));
    }
    catch (err) {
      dispatch(setError(err.response.data.message));
    }

  }
}

// admin delete product
export function deleteProduct(id){
  return async (dispatch,getState)=>{
        setStatus(STATUS.LOADING);
        try{
    
const {data} =  await axios.delete(`${server}/admin/product/${id}`,{withCredentials:true});
   dispatch(setIsDeleted(true));
   dispatch(setStatus(STATUS.IDLE));

        }
catch(err){
console.log("THIS IS",err.response.data.message);
  dispatch(setStatus(STATUS.ERROR));
}


  }
}
export default productsSlice.reducer;