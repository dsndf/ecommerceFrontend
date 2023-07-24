import React, { useEffect } from "react";
// import StepperCompo from "./StepperCompo";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/OrderDetail.scss";
import { getOrderDetails, setOrderError } from "../slices/orderDetailsSlice";
import { STATUS } from "../slices/productsSlice";
import Loading from "./Loading";
const OrderDetail = () => {
  const { shippingInfo } = useSelector((state) => state.cartReducer);
  const orderDetailState = useSelector((state) => state.orderDetailsReducer);
  const { paymentInfo, orderStatus, totalPrice, _id, orderItems,user } =
    orderDetailState.order;
 const {status,err} = orderDetailState;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if(err){
      toast.error(err);
      dispatch(setOrderError(""));
    }
    dispatch(getOrderDetails(id));
  }, []);
  if (status === STATUS.LOADING) {
    return <Loading />;
  }
  return (
    <div className="OrderDetailContainer">
      <div className="main">
        <h1>Order Details</h1>
        <div>
          {" "}
          <h1 className="orderid">Order Id</h1>
          <p>{_id}</p>
        </div>
        <div>
          <h1>Shipping Info</h1>
          <p><span>Name:</span>{user?.name}</p>
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
                    <p>{v.name.length>15?v.name.slice(0,15)+"...":v.name}</p>
                    <h4>
                      <small style={{color:"red"}}>{v.quantity} x ₹ {v.price} = </small>₹{v.quantity * v.price}
                    </h4>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
