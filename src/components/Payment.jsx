import React from "react";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { toast } from "react-toastify";

import {
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import StepperCompo from "./StepperCompo";

import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { placeOrder, setIsOrderPlaced } from "../slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.scss";
import { useEffect } from "react";
import { useState } from "react";
import { removeCartItems } from "../slices/cartSlice";
const server = process.env.REACT_APP_BACKEND_URL;

const Payment = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const { userData } = useSelector((state) => state.userReducer);
  const { shippingInfo, cart } = useSelector((state) => state.cartReducer);
  const { isOrderPlaced } = useSelector((state) => state.ordersReducer);
  const paybtn = useRef(null);
  const [process, setProcess] = useState(false);
  const { Total, subTotal, tax, shippingCharge, orderItems } = JSON.parse(
    sessionStorage.orderInfo
  );
  const removeItemsFromCart = ()=>{
      for(let item of cart){
        if(item.quantity === item.stocks){
          dispatch(removeCartItems(item.product));
        }
      }
  }
  const payment = { amount: Math.round(Total * 100) };
  const navigation = useNavigate();
  const order = {
    shippingInfo,
    orderItems,
    itemsPrice: subTotal,
    taxPrice: tax,
    shippingPrice: shippingCharge,
    totalPrice: Total,
    user: userData.id,
  };

  const paymentSubmit = async (e) => {
    e.preventDefault();
    console.log("called");
    if (!stripe || !elements) {
      return;
    }
   
    setProcess(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: userData.name,
        email: userData.email,
        address: {
          line1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postal_code: shippingInfo.pincode,
          country: shippingInfo.country,
        },
      },
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const config = {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${server}/payment/process`,
          { amount: Total, id },
          config
        );

        const { client_secret } = data;

        const result = await stripe.confirmCardPayment(client_secret);

        if (result.error) {
           setProcess(false);
          toast.error(result.error.message);

        }
         else {
          if (result.paymentIntent.status === "succeeded") {
            toast.success("Payment has been done successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,

              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
            dispatch(placeOrder(order));
            removeItemsFromCart();
          } else {
            toast.error("There is some issue");
          }
        }
      } catch (err) {
      
        toast.error(err.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (isOrderPlaced) {
      dispatch(setIsOrderPlaced(false));
      navigation("/order/success");
    }
  }, [isOrderPlaced]);

  return (
    <>
      <div className="main-payment-cont">
        <StepperCompo step={2} />
        <div className="paymentContainer">
          <div className="payment-box">
            <h3>Make Payment</h3>
            <div className="ipdiv">
              <MdOutlineAccountBalanceWallet />

              <CardNumberElement className="paymentinput" />
            </div>
            <div className="ipdiv">
              <FaRegCalendarCheck />
              <CardCvcElement className="paymentinput" />
            </div>
            <div className="ipdiv">
              <BsKey />
              <CardExpiryElement className="paymentinput" />
            </div>
            {!process ? (
              <input
                className="org-btn"
                type="submit"
                ref={paybtn}
                value={`Pay ₹${Total}.00`}
                onClick={paymentSubmit}
              />
            ) : (
              <button className="org-btn">
                <span className="processing"></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
