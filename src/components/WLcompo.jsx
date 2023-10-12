import React from "react";
import { Link } from "react-router-dom";
import "../styles/WLcompo.scss";
import { useSelector } from "react-redux";
import Heading from "./Heading";
import EmptyWishList from "./EmptyWishList";

const WLcompo = () => {
  const { wishList } = useSelector((state) => state.wishListReducer);
if(!wishList.length){
  return <EmptyWishList/>
}
  return (
    <div className="wl-comp">
    
<Heading text={'Your Wishlist'}></Heading>


      {wishList &&
        wishList.map((v) => {
          return (
            <div className="wl-box" key={v.product}>
              <div>
                <img src={v.image.url} alt="" />
               
              </div>

              <h3>{v.name}</h3>
              <h3 style={{fontWeight:500}}>₹{v.price}</h3>
               <Link to={`/product/${v.product}`}>
                  <button className="org-btn">View Product</button>
                </Link>
            </div>
          );
        })}
 
    </div>
  );
};

export default WLcompo;
