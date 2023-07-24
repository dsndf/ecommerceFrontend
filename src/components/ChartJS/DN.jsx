import React from 'react'
import './DN.css'
import {
    Chart as ChartJS,
   ArcElement,
    Legend,
    Tooltip,
  } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement,Tooltip,Legend);
const DN = ({outOfStock,inStock}) => {
  return (
    <div className='doughnut'>
     <Doughnut  data={{
      labels:["Out of Stock","InStock"],
      datasets:[{
       label:'Poll',
       data:[outOfStock,inStock ],
   
       backgroundColor:['#ca00008c',"#00ae0082"],
       borderColor:['red',"green"],
      }
      ]
     }} />
    </div>
  )
}

export default DN;
