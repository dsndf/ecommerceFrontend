import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { BsKey } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/AdminUserUpdate.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  adminUserUpdate,
  getAdminUserData,
  loadUser,
  setIsAdminUserUpdated,
  setUserError,
} from "../../slices/userSlice";
import { STATUS } from "../../slices/productsSlice";

import Loader from "../Loader";

const AdminUserUpdate = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { status, err, isAdminUserUpdated } = userState;
  const { email, name, role, _id } = userState.adminUserDetails;
  const [userEmail, setuserEmail] = useState(email ? email : "");
  const [userRole, setRole] = useState(role ? role : "");
  const [userName, setuserName] = useState(name ? name : "");
  const { id } = useParams();
  const navigation = useNavigate();
  useEffect(() => {
    if (err) {
      toast.error(err);
      dispatch(setUserError(""));
    }
    if (isAdminUserUpdated) {
      dispatch(setIsAdminUserUpdated(false));
      dispatch(loadUser());
      toast.success("User Updated Successfully ");
      navigation("/admin/users");
    }
    if (_id !== id) {
      dispatch(getAdminUserData(id));
    }
     else {
      setRole(role);
      setuserEmail(email);
      setuserName(name);
    }
  }, [userState.adminUserDetails, isAdminUserUpdated, err]);
  const updateUser = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", userName);
    myForm.set("email", userEmail);
    myForm.set("role", userRole);
    dispatch(adminUserUpdate(myForm, id));
  };

  return (
    <div className="admin-box admin-update-user">
      <form>
        {status === STATUS.LOADING ? (
          <Loader />
        ) : (
          <>
            <h3 style={{ fontWeight: 500 }}>UPDATE USER</h3>
            <div className="ipdiv">
              {<CiMail></CiMail>}
              <input
                type="text"
                required
                placeholder="Useremail"
                name="Name"
                value={userName}
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
              />
            </div>
            <div className="ipdiv">
              {<BsKey></BsKey>}
              <input
                type="email"
                required
                placeholder="Email"
                name="email"
                value={userEmail}
                onChange={(e) => {
                  setuserEmail(e.target.value);
                }}
              />
            </div>
            <div className="ipdiv">
              <MdVerifiedUser />
              <select name="" id=""  value={userRole} onChange={(e) =>setRole(e.target.value)}>
                <option selected  value={userRole}> {userRole} </option>
                <option value={userRole === "user" ? "admin" : "user"}>
                  {userRole === "user" ? "admin" : "user"}
                </option>
              </select>
            </div>
            <button type="submit" className="org-btn" onClick={updateUser}>
              Update
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminUserUpdate;
