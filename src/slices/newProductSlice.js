
import {createSlice} from '@reduxjs/toolkit';
import axios  from  'axios';
const initialState = {
newProduct:{},
isCreated:false,
status:"idle",
err:""
}
const server=process.env.REACT_APP_BACKEND_URL;

const newProductSlice = createSlice({
    initialState,
    name:"newProduct",
    reducers:{
 setNewProduct(state,action){
    state.newProduct = action.payload;
 },
 setIsCreated(state,action){
    state.isCreated = action.payload;
 }
,
setStatus(state,action){
    state.status = action.payload;
},
setCreateProductError(state,action){
    state.err = action.payload;
}

    }
});




export const {setCreateProductError,setIsCreated,setStatus,setNewProduct} = newProductSlice.actions;


export  function createProduct(myform){

return async (dispatch,getState)=>{
dispatch(setStatus("loading"));
try{
    const configuraton = { 
        withCredentials:true,
        headers:{
           
            "Content-Type":"multipart/form-data"
        }
    }

const {data} = await  axios.post(`${server}/admin/new/product`,myform,configuraton);
 
 dispatch(setNewProduct(data.newProduct));
 dispatch(setStatus("idle"));
 dispatch(setIsCreated(true));
}
catch(err){
  setStatus("error");
  setCreateProductError(err.response.data.message);
}

}


}

export default newProductSlice.reducer;