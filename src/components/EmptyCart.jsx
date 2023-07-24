import React from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import "../styles/EmptyCart.scss";
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <div className="emptycart">
      <Link to={'/products'}>
        <MdRemoveShoppingCart />
      </Link>
      <h2>No Items in the cart</h2>
     <Link className="org-btn" to={'/products'} >  View Products</Link> 
    </div>
  );
};

export default EmptyCart;
