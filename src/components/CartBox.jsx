import React from "react";
import "../styles/CartBox.scss";
import { removeCartItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
const CartBox = ({image,name,price,product}) => {
const dispatch = useDispatch();
const len = name.length;

  return (
    <div className="cartbox">
      <div>
 
        <img src={image?image.url:""} alt="image" />
      </div>

      <div>
        <p>{name.length<20?name:name.slice(0,10)}</p>
        <h4> ₹{price}.00</h4>
        <button  onClick={()=>{
   
          dispatch(removeCartItems(product));
        }} >Remove</button>
      </div>
    </div>
  );
};

export default CartBox;
