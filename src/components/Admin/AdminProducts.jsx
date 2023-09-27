import "../../styles/AdminPro.scss";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  deleteProduct,
  getAdminProducts,
  setError,
  setIsDeleted,
} from "../../slices/productsSlice";
import Loading from "../Loading";
import icons from "../../icons";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


const AdminProducts = () => {
  const { status, allProducts, isDeleted, err } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

  const gridColumns = useMemo(() => {
    return [  
      { field: "id", headerName: "PRODUCT ID", minWidth: 200, flex: 1 },
      { field: "name", headerName: "NAME", minWidth: 150, flex: 0.5 },
      {
        field: "stock",
        headerName: "STOCK",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "price",
        type: "number",
        headerName: "PRICE",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "ACTIONS",
        type: "number",
        sortable: false,
        minWidth: 150,
        flex: 0.3,
        renderCell: (params) => {
          return (
            <div>
              {" "}
              <Link
                to={`/admin/update/product/${params.getValue(params.id, "id")}`}
                className="action-icons edit-icon"
              >
                {icons.editpro}
              </Link>
              <Link
                onClick={() =>
                  dispatch(deleteProduct(params.getValue(params.id, "id")))
                }
                className="action-icons del-icon"
              >
                {icons.deletepro}
              </Link>
            </div>
          );
        },
      },
    ];
  }, []);
  const gridrows = useMemo(() => {
    return (
      allProducts &&
      allProducts.map((v) => {
        return {
          id: v._id,
          name: v.name,
          stock: v.stocks,
          price: v.price,
        };
      })
    );
  }, [allProducts]);
  useEffect(() => {
    if(isDeleted){
      toast.success("Product Deleted Successfully");
      dispatch(setIsDeleted(false));
    }
    if (err) {
      toast.error(err);
      dispatch(setError(""));
    }
    dispatch(getAdminProducts());
  
  }, [isDeleted, err]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="admin-box">
      <DataGrid
        rows={gridrows}
        columns={gridColumns}
        className="myorderTable"
      />
    </div>
  );
};

export default AdminProducts;
