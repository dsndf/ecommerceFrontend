import React from "react";

import ReactStars from "react-rating-stars-component";
import "../styles/ProductBox.scss";
import { Link } from "react-router-dom";

const ProductBox = ({ id, image, name, desc, price, numOfReviews, rating }) => {
  const len = name.length;
  if(name && len>75){
    name = name.slice(0,75);
   }
  return (
    <Link to={`/product/${id}`}>
      {" "}
      <div className="product">
        <img src={image.url?image.url:""} alt="" />
        <div  className="pro-detail" >
          <h4>{name}{
   len>75?"...":null

          }</h4>
          
     <div className="rating-section">
  <ReactStars
    edit={false}
    activeColor="#ee8f2a"
    size={window.innerWidth <= 500 ? 20 : 22}
    value={rating}
    color="rgb(185 185 185 / 47%)"
    isHalf={true}
  />
  <small>({numOfReviews} Reviews)</small>
</div>
<div className="price">₹{price}.00</div>

        </div>
      </div>
    </Link>
  );
};

export default ProductBox;
