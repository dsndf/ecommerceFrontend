import React, { useEffect } from "react";
import "../../styles/admin.scss";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";
const AdminComp = () => {
 
  return (
    <div className="admin-comp">
      <SideBar />
        <Outlet />
    </div>
  );
};

export default AdminComp;
