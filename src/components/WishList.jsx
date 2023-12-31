import React, { useEffect, useState } from "react";
import "../styles/wishlist.scss";
import { TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removewishListItems} from "../slices/wishListSlice";

const WishList = ({ close }) => {
  const { wishList } = useSelector((state) => state.wishListReducer);
  const dispatch = useDispatch();
    
       useEffect(()=>{
             if(!wishList.length){
                close();
             }
             document.body.style.overflowY = "hidden";
             return ()=>{
              document.body.style.overflowY="scroll";
             }

       },[wishList.length])


  return (
    <>
      <div className="modal-wrapper" id="ATC-wrapper" ></div>
      <div className="wishList-modal" id="wishListid">
        <TfiClose onClick={() => close()} />

        <h4>Your Wishlist</h4>
        <div className="wishList-modal-items">
          {wishList &&
            wishList.map((v) => {
              return (
                <div key={v.product} className="wishList-modal-box">
                  <div>
                    <img src={v.image.url} alt="img" />
                  </div>
                  <div className="pro-item-name">
                    <p>{v.name.length>20?v.name.slice(0,20):v.name}</p>
                  </div>
                  <div>
                    <p>{v.price}</p>
                  </div>
                  <TfiClose  onClick={()=>dispatch(removewishListItems(v.product))}  />
                </div>
              );
            })}
        </div>
        
  
        <div>
             
          <Link to={"/wishList"} className="org-btn">
            View Wishlist
          </Link>
        </div>
      </div>
    </>
  );
};

export default WishList;
