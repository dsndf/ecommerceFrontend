import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DN from "./ChartJS/DN";
import LineChart from "./ChartJS/LineChart";
import "../styles/DashBoard.scss";
import SideBar from "./SideBar";
import {useDispatch, useSelector} from 'react-redux';
import { getAdminProducts } from "../slices/productsSlice";
import axios from "axios";
import { toast } from "react-toastify";

import ErrorCompo from "./ErrorCompo";
const server=process.env.REACT_APP_BACKEND_URL;

const DashBoard = () => {

const [stats,setStats] = useState({});
const [err,setError] = useState(false);
async function getStats(){
    try{
        const {data} =   await axios.get(`${server}/admin/stats`,{withCredentials:true});
     setStats(data);
    }
    catch(error){
      setError(error.response.data.message);
    }
   
}   

   useEffect(()=>{ 
    if(err){
      toast.error(err);
  setError("");
    }
     getStats();
   },[err])
  

  return (
      <div className="main-dashboard admin-box ">
        <div className="dashboard-highlights">
          <div>
            <h1>Orders <br /> <div style={{textAlign:"center",color:"#b500bb"}}>{stats?stats.orders:0}</div> </h1>
            
          </div>
          <div>
            <h1>Products <br /> <div style={{textAlign:"center",color:"red"}}>{stats?stats.products:0}</div></h1>
          </div>
          <div>
            <h1>Users <br /> <div style={{textAlign:"center",color:"green"}}>{stats?stats.users:0}</div></h1>
          </div>
        </div>
    


         <DN outOfStock = {stats.outOfStock} inStock = {stats.inStock} />
         <LineChart income={stats.income}  />
      </div>
  );
};

export default DashBoard;
