import "../../styles/AdminOrders.scss";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import icons from "../../icons";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import { toast } from "react-toastify";

import {
  deleteOrder,
  getAllOrders,
  setIsOrderDeleted,
  setOrdersError,
} from "../../slices/ordersSlice";
import ErrorCompo from "../ErrorCompo";
import { STATUS } from "../../slices/productsSlice";

const AdminOrders = () => {
  const { status, allOrders, err, isOrderDeleted } = useSelector(
    (state) => state.ordersReducer
  );
  const dispatch = useDispatch();

  const gridColumns = [
      { field: "id", headerName: "ORDER ID", minWidth: 200, flex: 1 },
      { field: "status", headerName: "STATUS", minWidth: 150, flex: 0.5 },
      {
        field: "qty",
        headerName: "ITEM QTY",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "amount",
        type: "number",
        headerName: "AMOUNT",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "number",
        sortable: false,
        minWidth: 150,
        flex: 0.3,
        renderCell: (params) => {
          return (
            <div>
          
          
              <Link
                to={`/admin/update/order/${params.getValue(params.id, "id")}`}
                className="action-icons edit-icon"
              >
                {icons.editpro}
              </Link>
              <Link
                className="action-icons del-icon"
                onClick={() =>
                  dispatch(deleteOrder(params.getValue(params.id, "id")))
                }
              >
                {icons.deletepro}
              </Link>
            </div>
          );
        },
      },  ];

  const gridrows = allOrders &&
      allOrders.map((v) => {
        return {
          id: v._id,
          status: v.orderStatus,
          qty: v.orderItems.length,
          amount: v.totalPrice,
        };
      });
  useEffect(() => {
    if(err){
      toast.error(err);
      dispatch(setOrdersError(""));
    }
    dispatch(setIsOrderDeleted(false));
    dispatch(getAllOrders());
    document.querySelector(".nav-cont").style.backgroundColor = "#fff";

    return () => {
      document.querySelector(".nav-cont").style.backgroundColor = "transparent";
    };
   
  }, [isOrderDeleted]);

  if (status === "loading") {
    return <Loading />;
  }


  return (

    
      <div  className="admin-box" >
        <DataGrid
          rows={gridrows}
          columns={gridColumns}
          className="myorderTable"
        />
      </div>

  );
};

export default AdminOrders;
