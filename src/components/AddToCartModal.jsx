import React, { useEffect, useState } from "react";
import "../styles/cartmodal.scss";
import { GrAdd, GrSubtract } from "react-icons/gr";

import { TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItems, setCartItemQuantity } from "../slices/cartSlice";

const AddToCartModal = ({ close }) => {
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
   let subtotal= cart.reduce((acc,v)=>{
        return  acc+v.price*v.quantity;
   },0);
useEffect(()=>{
  if(cart.length === 0){
    close();
  } 
 document.body.style.overflowY = "hidden";
 return ()=>{
  document.body.style.overflowY="scroll";
 }
},[cart.length])


  return (
    <>
      <div className="modal-wrapper" id="ATC-wrapper" ></div>
      <div className="cart-modal" id="cartid">
        <TfiClose onClick={() => close()} />

        <h4>Shopping Cart</h4>
        <div className="cart-modal-items">
          {cart &&
            cart.map((v, index) => {
              return (
                <div key={index} className="cart-modal-box">
                  <div>
                    <img src={v.image.url} alt="img" />
                  </div>
                  <div className="pro-item-name">
                    
                    <p>{ v.name.length<30?v.name:v.name.slice(0,10)}</p>
                    <div className="qty-input">
                      <button
                        className="minusbtn"
                        onClick={() => {
                          if (v.quantity - 1 < 1) {
                            return;
                          } else {
                            dispatch(
                              setCartItemQuantity({
                                id: v.product,
                                quantity: v.quantity - 1,
                              })
                            );
                          }
                        }}
                      >
                        <GrSubtract />
                      </button>
                      <input value={v.quantity} type="number" readOnly />
                      <button
                        id="qty-btn"
                         onClick={() => {
                          if (v.quantity+1> v.stocks) {
                             return;
                           } else {
                   dispatch(setCartItemQuantity({id:v.product,quantity:v.quantity+1}))
                           }
                        }}
                        className="addbtn"
                      >
                        <GrAdd />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p>₹{v.price*v.quantity}.00</p>
                  </div>
                  <TfiClose  onClick={()=>dispatch(removeCartItems(v.product))}  />
                </div>
              );
            })}
        </div>
        
  
        <div>
           <div className="sub-total">
            <p>Sub Total:</p>
            <p>₹{subtotal}.00</p>
           </div>
             
          <Link to={"/cart"}   className="org-btn">
            View Cart
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddToCartModal;
