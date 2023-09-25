import React, { useEffect, useState } from "react";
import "../styles/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { BsKey } from "react-icons/bs";

import { AiOutlineUser } from "react-icons/ai";
import {
  fetchUser,
  registerUser,
  setLoginStatus,
  setRegisterStatus,
  setUserError,
} from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../slices/productsSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Login = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { isLogin, status, isRegister, err } = userState;
  const navigation = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginChangeHandler = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    });
  };
  const loginSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(fetchUser(loginData.email, loginData.password));
    setLoginData({ email: "", password: "" });
  };

  useEffect(() => {
    if (isLogin) {
      toast.success("Logged In Successfully");
      dispatch(setLoginStatus(false));
      navigation('/account')
    }
    if (isRegister) {
      toast.success("Registered Successfully");
      dispatch(setRegisterStatus(false));
    }
    if (err != "") {
      toast.error(err);
      dispatch(setUserError(""));
    }
  }, [ isLogin, status, isRegister, err]);

  const registerDataChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          console.log(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userData);
    let myForm = new FormData();
    //  myForm.name  = userData.name;
    //  myForm.email = userData.email;
    //  myForm.password = userData.password;
    //  myForm.avatar = avatar;
    myForm.set("name", userData.name);
    myForm.set("email", userData.email);
    myForm.set("password", userData.password);
    myForm.set("avatar", avatar);
    console.log(myForm);
    dispatch(registerUser(myForm));
  };

  const getLoginForm = () => {
    let loginForm =
      document.querySelector(".userForm").firstElementChild.nextElementSibling;
    let registerForm = document.querySelector(".userForm").lastElementChild;
    let hr = document.getElementById("hrline");
    hr.style.transform = "translateX(-50%)";
    loginForm.style.transform = `translateX(0%)`;
    registerForm.style.transform = `translateX(110%)`;
  };
  const getRegistrationForm = () => {
    let loginForm =
      document.querySelector(".userForm").firstElementChild.nextElementSibling;
    let registerForm = document.querySelector(".userForm").lastElementChild;
    let hr = document.getElementById("hrline");
    hr.style.transform = "translateX(50%)";
    loginForm.style.transform = `translateX(-110%)`;
    registerForm.style.transform = `translateX(0%)`;
  };

  return (
    <div className="log-sign-cont">
      <div className="userLoginPage">
        <div action="" className="userForm">
          {userState.status === STATUS.LOADING ? (
            <Loader />
          ) : (
            <>
              <div className="userFormOpt">
                <h2 id="login" onClick={() => getLoginForm()}>
                  Login
                </h2>
                <h2 id="register" onClick={() => getRegistrationForm()}>
                  Register
                </h2>
                <hr id="hrline" />
              </div>
              <form className="LogIn" onSubmit={loginSubmitHandler}>
                <div className="ipdiv">
                  {" "}
                  {<CiMail></CiMail>}
                  <input
                    type="text"
                    required
                    placeholder="Useremail"
                    value={loginData.email}
                    name="email"
                    onChange={loginChangeHandler}
                  />
                </div>

                <div className="ipdiv">
                  {<BsKey></BsKey>}
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={loginData.password}
                    name="password"
                    onChange={loginChangeHandler}
                  />
                </div>
                <Link to={"/forgot/password"}>
                  <small>Forgot Password?</small>{" "}
                </Link>
                <button type="submit" className="org-btn">
                  Log In
                </button>
              </form>
              <form
                className="SignUp"
                encType="multipart/form-data"
                onSubmit={registerSubmitHandler}
              >
                <div className="ipdiv">
                  {" "}
                  <AiOutlineUser />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    name="name"
                    value={userData.name}
                    onChange={registerDataChangeHandler}
                  />
                </div>

                <div className="ipdiv">
                  {" "}
                  <CiMail></CiMail>
                  <input
                    type="text"
                    required
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    onChange={registerDataChangeHandler}
                  />
                </div>
                <div className="ipdiv">
                  {" "}
                  <BsKey></BsKey>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    name="password"
                    value={userData.password}
                    onChange={registerDataChangeHandler}
                  />
                </div>

                <div id="SignUpImage">
                  <input
                    style={{
                      border: "none",
                    }}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    placeholder="Choose Avatar"
                    required
                    onChange={registerDataChangeHandler}
                  />
                </div>

                <button type="submit" className="org-btn">
                  Sign Up
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
