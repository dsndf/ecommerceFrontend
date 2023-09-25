import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../styles/OrderDetail.scss";
import "../../styles/orderupdate.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetails,
  setIsOrderUpdated,
  setOrderError,
  updateOrderStatus,
} from "../../slices/orderDetailsSlice";
import { STATUS } from "../../slices/productsSlice";
import Loading from "../Loading";

const AdminOrderUpdate = () => {
  const { cart, shippingInfo } = useSelector((state) => state.cartReducer);
  const orderDetailState = useSelector((state) => state.orderDetailsReducer);
  const { isOrderUpdated } = orderDetailState;

  const { paymentInfo, orderStatus, totalPrice, _id, orderItems } =
    orderDetailState.order;
  const { userData } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  useEffect(() => {
  if(orderDetailState.err){
    toast.error(orderDetailState.err);
dispatch(setOrderError(""));
    }
    dispatch(getOrderDetails(id));
    dispatch(setIsOrderUpdated(false));
    setState("");
    document.querySelector(".nav-cont").style.backgroundColor = "#fff";

    return () => {
      document.querySelector(".nav-cont").style.backgroundColor = "transparent";
    };
  }, [orderStatus, isOrderUpdated]);
  if (orderDetailState.status === STATUS.LOADING) {
    return <Loading />;
  }

  return (
    <div className="admin-box admin-order-update-cont">
      <div className="OrderDetailContainer ">
      <div className="main">
        <h1>Order Details</h1>
        <div>
          {" "}
          <h1 className="orderid">Order Id</h1>
          <p>{_id}</p>
        </div>
        <div>
          <h1>Shipping Info</h1>
          <p><span>Name:</span>{userData?.name}</p>
          <p><span>Address:</span>{shippingInfo.address}</p>
          <p><span>Phone no.:</span>{shippingInfo.phoneNumber}</p>
        </div>
        <div>
          <h1>Payment</h1>
        
          <p><span>Status:</span>{paymentInfo && paymentInfo.status}</p>
        
          <p><span>Amount:</span>₹{totalPrice}</p>
        </div>
        <div>
          <h1>Order Status</h1>
          <p style={{ color: orderStatus === "Delivered" ?"#00e500":"red" ,fontSize:"18px"}}>
            {orderStatus}
          </p>
        </div>

        <div>
          <h1>Ordered Items:</h1>
          <div style={{ margin: "10px 0" }}>
            {orderItems &&
              orderItems.map((v, ind) => {
                return (
                  <div className="cartItem" key={ind}>
                    <img
                      src={v.image ? v.image : ""}
                      style={{ width: "70px" }}
                      alt="image"
                    />
                    <p>{ v.name.length<30?v.name:v.name.slice(0,10)}</p>
                    <h4>
                      {v.quantity} x ₹ {v.price} = ₹{v.quantity * v.price}
                    </h4>
                  </div>
                );
              })}
          </div>
        </div>
            <div className="update-box">
          <h3>Process Order</h3>

          <select
            name=""
            id=""
            required
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Choose Category</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
          className="org-btn"
            type="submit"
            disabled ={state!==""?false:true}
            onClick={(e) => {
                 e.preventDefault();
              dispatch(updateOrderStatus(id, state));
            }}
          >
            Update Status
          </button>
        </div>

      </div>
    </div>
 
  

 

    </div>
  );
};

export default AdminOrderUpdate;
