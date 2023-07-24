import React from "react";
import "../styles/RelatedProduct.scss";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const RelatedProduct = ({ name, price, url, rating ,id}) => {
  return (
    <Link to={`/product/${id}`} >
      {" "}
      <div className="rel-pro">
        <div>
          <img src={url} alt="" />
        </div>
        <p>{name}</p>
        <ReactStars
          edit={false}
          activeColor="rgb(238, 143, 42)"
          size={window.innerWidth < 600 ? 15 : 20}
          value={rating}
          color={"rgb(185 185 185 / 47%)"}
          isHalf={true}
        ></ReactStars>
        <p style={{ fontWeight: 400 }}>₹{price}</p>
      </div>
    </Link>
  );
};

export default RelatedProduct;
