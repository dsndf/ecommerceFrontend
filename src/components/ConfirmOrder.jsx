import React from "react";
import StepperCompo from "./StepperCompo";
import "../styles/ConfirmOrder.scss";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";


const ConfirmOrder = () => {
  const { cart, shippingInfo } = useSelector((state) => state.cartReducer);
  const { userData } = useSelector((state) => state.userReducer);
  const navigation = useNavigate();
  const subTotal = cart.reduce((acc, v) => {
    return acc + v.price * v.quantity;
  }, 0);

  const orderItems = cart.map((v) => {
    return {
      name: v.name,
      product: v.product,
      price: v.price,
      image: v.image.url,
      stocks: v.stocks,
      quantity: v.quantity,
    };
  });

  const tax =  Math.round(subTotal * 0.18);
  const shippingCharge = subTotal > 1000 ? 0 : 30;
  const Total = subTotal + tax + shippingCharge;
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`;
  const proceedToPayment = () => {
    const orderInfo = {
      subTotal,
      tax,
      shippingCharge,
      Total,
      orderItems,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
    navigation("/payment");
  };
  return (
    <div className="confirmOrderContainer">
      {/* <div className="page-banner">
        <h3>#Confirm Order</h3>
      </div> */}
 <StepperCompo step={1} />
     
      <div className="main">
        <div className="c1">
          <div className="c11">
            <h1>SHIPPING INFO</h1>
            <div className="Details">
              <div>
                <div className="row">
                  <h5>Name:</h5>{" "}
                  <h5>{userData.name ? userData.name : "James"}</h5>
                </div>
                <div className="row">
                  <h5>Address:</h5> <h5>{address}</h5>
                </div>
                <div className="row">
                  <h5>Phone:</h5>
                  <h5>{shippingInfo.phoneNumber}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="c12">
            <h1>YOUR CART ITEMS:</h1>
            <div
              style={{ margin: "10px 0"}}
              className="confirm-cart"
            >
              {cart.map((v, ind) => {
                return (
                  <div className="cartItem" key={ind}>
                    <img
                      src={v.image ? v.image.url : ""}
                      style={{ width: "70px" }}
                      alt="image"
                    />
                    <h5>{v.name.length>20?v.name.slice(0,20)+"...":v.name}</h5>
                    <h4>
                      {v.quantity} x ₹ {v.price} ={" "}
                      <b>₹{v.quantity * v.price}</b>
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="c2">
          <h1>ORDER PAYMENT</h1>
          <div>
            <div className="c21">
              <h5>SubTotal:</h5>
              <h5>Shipping Charges:</h5>
              <h5>GST:</h5>
            </div>

            <div className="c22">
              {" "}
              <h5>₹{subTotal}</h5> 
              <h5>₹{shippingCharge}</h5>
              <h5>₹{tax}</h5>
            </div>
          </div>

          <div
            className="total"
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "black",
            }}
          >
            <h5 style={{ fontWeight: "600" }}>Total:</h5>
            <h5 style={{ fontWeight: "600" }}>₹{Total}</h5>
          </div>
          <button className="org-btn" onClick={proceedToPayment}>
            Proceed Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
