import React from "react";
import "../styles/ReviewBox.scss";
import {GoComment,GoStar} from 'react-icons/go';
const ReviewBox = ({name,avatar,rating,review}) => {
  return (
    <div className="review-box">
      <p>
        <span> <img src={avatar?.url} alt="img" /> </span>
     
        <span>{name}</span>
        <GoComment/>
      </p>
      <p style={{marginBottom:"5px"}}>{rating} <GoStar style={{fill:"orange",fontSize:"13px"}}/> </p>

      <p>
     {review}
      </p>
    </div>
  );
};

export default ReviewBox;
