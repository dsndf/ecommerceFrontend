import React from 'react'
import '../styles/EmptyWishList.scss';
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import {GiEmptyMetalBucket} from 'react-icons/gi';
const EmptyWishList = () => {
  return (
    <div className='empty-wish-list'>
         <Link to={'/products'}>
        <GiEmptyMetalBucket />
      </Link>
      <h2>No Items in the wish list</h2>
     <Link to={'/products'}  >  <button className="org-btn">View Products</button></Link> 
    </div>
  )
}

export default EmptyWishList
