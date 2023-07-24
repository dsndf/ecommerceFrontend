import React from "react";
import { TreeItem, TreeView } from "@mui/lab";
import { MdExpandLess, MdImportExport, MdOutlineReviews } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { RiDashboardFill } from "react-icons/ri";

import "../styles/SideBar.scss";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
  
    <div className="side-bar">
    
      <Link to={"/admin/dashboard"}>{<RiDashboardFill />}Dashboard</Link>
      <TreeView
        defaultCollapseIcon={<MdExpandLess />}
        defaultExpandIcon={<MdImportExport />}
      >
        <TreeItem nodeId="1" label="Products" className="tree-pro">
          <Link to={"/admin/products"}>
            <TreeItem nodeId="1-1" label="All"></TreeItem>
          </Link>
          <Link to={"/admin/new/product"}>
            <TreeItem nodeId="2" label="Create"></TreeItem>
          </Link>
        </TreeItem>
      </TreeView>
      <Link to={"/admin/orders"}>{<AiOutlineOrderedList />}Orders</Link>
      <Link to={"/admin/users"}>{<HiUsers />}Users</Link>
      <Link to={"/admin/reviews"}>{<MdOutlineReviews />}Reviews</Link>
    </div>
  );
};

export default SideBar;
