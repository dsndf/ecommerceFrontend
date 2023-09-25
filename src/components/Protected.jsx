import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Protected = ({ isAuth,isAdmin=false,role="user",children}) => {  
  const  navigateTo = useNavigate();
  useEffect(()=>{

     if(isAuth === false){
      navigateTo('/login');
     }
    // if(isAdmin && role === "user"){
    //   toast.info('Only Admin Can Access')
    //  navigateTo('/');

    // }

  },[isAuth,role]);

  
  return  children;
};

export default Protected;
