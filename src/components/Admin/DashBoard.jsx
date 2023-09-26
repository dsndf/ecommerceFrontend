import React, { useEffect, useState } from "react";
import DN from "../ChartJS/DN";
import LineChart from "../ChartJS/LineChart";
import "../../styles/DashBoard.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";
const server=process.env.REACT_APP_BACKEND_URL;

const DashBoard = () => {

const [stats,setStats] = useState({});
const [err,setError] = useState(false);
const [loading,setLoading] = useState(false);

async function getStats(){
  setLoading(true);
    try{
        const {data} =   await axios.get(`${server}/admin/stats`,{withCredentials:true});
     setStats(data);
     setLoading(false);
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
  if(loading){
    return <Loading/>
  }
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
