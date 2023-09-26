import { createSlice } from "@reduxjs/toolkit"
import { setError, STATUS } from "./productsSlice";
import axios from 'axios';

const server=process.env.REACT_APP_BACKEND_URL;




const initialState = {
    userData: {},
    usersData: [],
    adminUserDetails: {},
    isAdminUserUpdated: false,
    isAuthenticated: false,
    status: "idle",
    isUpdated: false,
    isDeleted: false,
    isLogin: false,
    isLogout:false,
    isRegister: false,
    isPasswordUpdate: false,
    forgotRequest: false,
    forgotRes: "",
    err: ""
}

const userSlice = createSlice({
    initialState,
    name: "userData",
    reducers: {
        setIsDeleted(state, action) {
            state.isDeleted = action.payload;
        },
        setAdminUserDetails(state, action) {
            state.adminUserDetails = action.payload;
        },
        setIsAdminUserUpdated(state, action) {
            state.isAdminUserUpdated = action.payload;
        }
        ,
        setUsersData(state, action) {
            state.usersData = action.payload;
        }
        ,
        setUserData(state, action) {
            state.userData = action.payload;
        }
        ,
        setStatus(state, action) {
            state.status = action.payload;
        },
        setAuth(state, action) {
            state.isAuthenticated = action.payload;
        }
        ,
        setUserError(state, action) {
            state.err = action.payload;
        }
        ,
        setUpdateStatus(state, action) {
            state.isUpdated = action.payload;
        },
        setLoginStatus(state, action) {
            state.isLogin = action.payload;
        },
        setLogoutStatus(state, action) {
            state.isLogin = action.payload;
        },
        setRegisterStatus(state, action) {
            state.isRegister = action.payload;
        },
        setUpdatePassword(state, action) {
            state.isPasswordUpdate = action.payload;
        },

        setForgotRequest(state, action) {
            state.forgotRequest = action.payload;

        },
        setForgotResponse(state, action) {
            state.forgotRes = action.payload;
        }
    }

});

export const {setLogoutStatus ,setIsDeleted, setAdminUserDetails, setIsAdminUserUpdated, setUsersData, setAuth, setUserData, setForgotRequest, setForgotResponse, setStatus, setUpdateStatus, setRegisterStatus, setUpdatePassword, setUserError, setLoginStatus } = userSlice.actions;

//thunk for get all users data

export function getAdminUserData(id) {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {

            const { data } = await axios.get(`${server}/admin/user/${id}`,{withCredentials:true});
            dispatch(setAdminUserDetails(data.user));
            dispatch(setStatus(STATUS.IDLE));
        }
        catch (err) {
            dispatch(setError(err.response.data.message));
        }
    }

}
export function deleteUser(id) {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {

            const { data } = await axios.delete(`${server}/admin/user/${id}`,{withCredentials:true});
            dispatch(setIsDeleted(true));
            dispatch(setStatus(STATUS.IDLE));
        }
        catch (err) {
            dispatch(setError(err.response.data.message));
        }
    }

}
export function getAdminUsersData() {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {

            const { data } = await axios.get(`${server}/admin/all/users`,{withCredentials:true});
            dispatch(setUsersData(data.allUsersData));
            dispatch(setStatus(STATUS.IDLE));
        }
        catch (err) {
            dispatch(setError(err.response.data.message));
        }
    }

}




// thunk middleware login
export function fetchUser(loginEmail, loginPassword) {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {
        
            let bodyData = { email: loginEmail, password: loginPassword }
            let { data } = await axios.post(`${server}/user/login`, bodyData, {withCredentials:true});
            dispatch(setUserData(data.user));
            dispatch(setAuth(true));
            dispatch(setLoginStatus(true));
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setUserError(""));

        }
        catch (err) {
            dispatch(setLoginStatus(false))
            dispatch(setStatus(STATUS.ERROR));
            dispatch(setUserError(err.response.data.message));
        }


    }


}
// thunk middleware of user registration
export function registerUser(userForm) {
    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {
           
            let obj = { ...userForm };
           console.log("user data",obj)

            let config = {
                withCredentials:true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
             
            }
            const { data } = await axios.post(`${server}/user/register`, userForm, config);

            if (!data.success) {
                throw new Error(data.message);
            }
            dispatch(setUserData(data.user));
            dispatch(setAuth(true));
            dispatch(setRegisterStatus(true));
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setUserError(""));


        }

        catch (err) {
            dispatch(setRegisterStatus(false));
            dispatch(setStatus(STATUS.ERROR));
            dispatch(setUserError(err.response.data.message));
        }

    }

}
// thunk middleware  to load user if he is login

export function loadUser() {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));

        try {

            const { data } = await axios.get(`${server}/my`,{withCredentials:true});
       
            if (!data.success) {
                throw new Error(data.message)
            }
            dispatch(setUserData(data.userdata));
            dispatch(setAuth(true));
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setUserError(""));



        }
        catch (err) {
            dispatch(setStatus(STATUS.IDLE));
        }



    }


}
// thunk middleware for logout
export function logout() {
    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));

        try {

            const { data } = await axios.get(`${server}/logout`,{withCredentials:true});
            dispatch(setUserData({}));
            dispatch(setAuth(false));
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setLogoutStatus(true));
            dispatch(setUserError(""));


        }
        catch (err) {
            dispatch(setUserError(err.response.data.message));
            dispatch(setStatus(STATUS.ERROR));
        }


    }


}


// thunk middleware for profile update
export function updateProfile(myform) {
    console.log("my form ", myform);
    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {
            let config = { 
                    withCredentials:true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
            if (myform.avatar) {
                config = {
               ...config,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            }


            const { data } = await axios.put(`${server}/my`, myform, config);
            
            dispatch(setUpdateStatus(true));
            dispatch(setUserError(""));

        }
        catch (err) {
            dispatch(setUserError(err.response.data.message));
            dispatch(setStatus(STATUS.ERROR));

        }
    }


}

// think for update password
export function passwordUpdation(oldPassword, newPassword, confirmPassword) {

    return async (dispatch, getState) => {

        dispatch(setStatus(STATUS.LOADING));
        try {
            let config = {
                withCredentials:true,
                headers: {
                    "Content-Type": "application/json"
                }
            }



            const { data } = await axios.put(`${server}/user/password/update`, { oldPassword, newPassword, confirmPassword }, config);
            dispatch(setStatus(STATUS.IDLE));

            dispatch(setUpdatePassword(true));
            dispatch(setUserError(""));

        }
        catch (err) {
            dispatch(setUserError(err.response.data.message));
            dispatch(setStatus(STATUS.ERROR));
        }
    }



}

// thunk middleware for forgot password

export function forgotPassword(myform) {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));

        try {
            let config = {
                withCredentials:true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post(`${server}/user/new_password`, myform, config);
            console.log(data);
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setForgotRequest(true));
            dispatch(setForgotResponse(data));
        }
        catch (err) {
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setUserError(err.response.data.message));
            dispatch(setForgotRequest(false));

        }




    }

}
// thunk middleware for reset password

export function resetPassword(token, myform) {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {
            let config = {
                withCredentials:true,
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.put(`${server}/user/password/reset/${token}`, myform, config);
            dispatch(setUserData(data.user));
            dispatch(setAuth(true));
            dispatch(setStatus(STATUS.IDLE));
        }
        catch (err) {
            dispatch(setAuth(false));
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setUserError(err));
        }


    }


}
export function adminUserUpdate(myform, id) {

    return async (dispatch, getState) => {
        dispatch(setStatus(STATUS.LOADING));
        try {
            let config = {
                withCredentials:true,
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.put(`${server}/admin/user/${id}`, myform, config);
            dispatch(setIsAdminUserUpdated(true));
            dispatch(setStatus(STATUS.IDLE));
        }
        catch (err) {
            dispatch(setStatus(STATUS.IDLE));
            dispatch(setUserError(err));
        }


    }


}



export default userSlice.reducer;
