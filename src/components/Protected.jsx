import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Protected = ({ isAuth,isAdmin=false,role="user",children}) => {  
  const  navigateTo = useNavigate();
  useEffect(()=>{

     if(isAuth === false){
      navigateTo('/login');
     }
  if( isAuth && isAdmin === true && role === "user"){
    navigateTo('/account');
  }

  },[isAuth,role]);

  
  return  children;
};

export default Protected;
