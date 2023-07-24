import React from "react";
import "../styles/Error.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const ErrorCompo = ({ msg }) => {
  return (
    <>
      
      <div className="Error
    ">
        <h2>{msg?msg:"!Please check your internet connection"}</h2>
      </div>
      <ToastContainer />
    </>
  );
};

export default ErrorCompo;
