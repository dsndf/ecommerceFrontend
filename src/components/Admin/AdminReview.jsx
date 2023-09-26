import "../../styles/AdminReview.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import icons from "../../icons";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  deleteProductReview,
  getProductReviews,
  setIsRevieweDeleted,
  setProductDetailsError,
} from "../../slices/ProDetailSlice";
import ErrorCompo from "../ErrorCompo";
import { STATUS } from "../../slices/productsSlice";

const AdminReview = () => {
  const { status, productReviews, isReviewDeleted, err } = useSelector(
    (state) => state.productDetailReducer
  );
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");

  const getReviews = (e) => {
    e.preventDefault();
    console.log("REVIEW ID IS HERE", productId);
    if (productId) {
      console.log("entered");
      dispatch(getProductReviews(productId));
    } else return;
  };

  const gridColumns =  [
      { field: "id", headerName: "REVIEW ID", minWidth: 200, flex: 1 },
      { field: "username", headerName: "USER NAME", minWidth: 150, flex: 0.5 },
      {
        field: "comment",
        headerName: "COMMENT",
        type: "string",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "rating",
        type: "number",
        headerName: "RATING",
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
              <Link
                onClick={() =>
                  dispatch(
                    deleteProductReview(
                      productId,
                      params.getValue(params.id, "id")
                    )
                  )
                }
                className="action-icons"
              >
                {icons.deletepro}
              </Link>
            </div>
          );
        },
      },
    ]

  const gridrows = productReviews &&productReviews.map((v) => {
        return {
          id: v._id,
          username: v.name,
          comment: v.comment,
          rating: v.rating,
        };
      })

  useEffect(() => {
    if (isReviewDeleted) {
      toast.success("Review Deleted Successfully");
      dispatch(getProductReviews(productId));
      dispatch(setIsRevieweDeleted(false));
    }
   if(err){
      toast.error(err);
    dispatch(setProductDetailsError(""));
    }
    document.querySelector(".nav-cont").style.backgroundColor = "#fff";

    return () => {
      document.querySelector(".nav-cont").style.backgroundColor = "transparent";
    };
  }, [isReviewDeleted, err]);
  if (status === STATUS.LOADING) {
    return <Loading />;
  }

  return (



      <div className="admin-reviews admin-box">
        <form action="" onSubmit={getReviews}>
          <input
            type="text"
            value={productId}
            placeholder="Product ID"
            onChange={(e) => setProductId(e.target.value)}
            required
          />
          <input type="submit" className="black-btn" />
        </form>
        {productReviews ? (
          <DataGrid
            rows={gridrows}
            columns={gridColumns}
            className="myorderTable"
          />
        ) : (
          "NO REVIEWS"
        )}
      </div>
        
  );
};

export default AdminReview;
