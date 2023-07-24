import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, setOrder, setOrdersError } from "../slices/ordersSlice";
import { STATUS } from "../slices/productsSlice";
import Loading from "./Loading";
import '../styles/MyOrders.scss'
import {
  DataGrid
} from "@mui/x-data-grid";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { minWidth, width } from "@mui/system";
import icons from "../icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, status,err } = useSelector((state) => state.ordersReducer);
  const gridColumns = [
    { field: "id", headerName: "ORDER ID", minWidth: 150, flex: 1 },
    {
       field: "status",
        headerName: "STATUS",
         minWidth: 150,
          flex: 0.5 ,
         cellClassName:(params)=>{
              return params.getValue(params.id,'status')==='Delivered'?"greenClass":"redClass";
            }
          
        
        },
    {
      field: "quantity",
      headerName: "ITEM QTY",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "AMOUNT",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      type: "number",
      sortable: false,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <Link to ={`/order/${params.getValue(params.id,'id')}`}>
             {icons.orderDetail}
          </Link>
        );
      },
    },
  ];

  const gridRows =
    orders &&
    orders.map((v) => {
      return {
        id: v._id,
        status: v.orderStatus,
        quantity: v.orderItems.length,
        amount: v.totalPrice,
      };
    });
  console.log(gridRows);
  useEffect(() => {
  if(err){
     toast.error(err);
     dispatch(setOrdersError(""));
  }
  else{
    dispatch(myOrders());
  }
  }, [err]);
  if (status === STATUS.LOADING) {
    return <Loading />;
  }

  console.log(icons);
  return (
    <div  className="maindiv">
      <DataGrid  className="myorderTable" rows={gridRows} columns={gridColumns} />
    <Link to={'/products'}  className="continue-shop" >Continue Shopping...</Link>
  
    </div>
  );
};

export default MyOrders;
