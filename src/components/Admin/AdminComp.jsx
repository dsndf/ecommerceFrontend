import React, { useEffect } from "react";
import "../../styles/admin.scss";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";
const AdminComp = () => {
useEffect(()=>{
document.querySelector('.footer').style.display="none";
return ()=>{
document.querySelector('.footer').style.display="flex";

}
},[])

  return (
    <div className="admin-comp">
      <SideBar />
        <Outlet />
    </div>
  );
};

export default AdminComp;
