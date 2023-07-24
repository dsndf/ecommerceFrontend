import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../slices/userSlice";
import "../styles/Account.scss";
const Account = () => {
  const { isAuthenticated, userData } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  const navigation = useNavigate();
  let joinAt = new Date(userData.createdAt);
  joinAt = joinAt.toDateString();
  return (
    <>
      <div className="profile-cont">
        <div className="profile-data">
          <h1>Account</h1>
          <div>
            <h3>Profile Photo</h3>
            <img src={userData?.avatar?.url} alt="" />
          </div>
          <div>
            <h3>Username</h3>
            <h4>{userData?.name}</h4>
          </div>
          <div>
            <h3>Email</h3>
            <h4>{userData?.email}</h4>
          </div>
          <div>
            <h3>Join On</h3>
            <h4>{joinAt}</h4>
          </div>
          <div className="profile-links">
            <Link to={"/edit/profile"}>Edit Proflle</Link>
            <Link  to={"/update/password"} >Change Password</Link>
             <Link  onClick={()=>dispatch(logout())} >Logout?</Link>
          </div>
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <Link to={"/orders"} className="org-btn">
              My Orders
            </Link>
        
           
          </div>
     

        </div>
      </div>
    </>
  );
};

export default Account;
