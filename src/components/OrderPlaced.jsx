import React from 'react'
import {FiThumbsUp} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/OrderPlaced.scss'
const OrderPlaced = () => {
  return (
    <div className='orderplacedContainer'>
        
            <FiThumbsUp/>
            <h2>Order Placed</h2>
           <Link  className='org-btn'  to={'/orders'} >View Orders</Link>


    </div>
  )
}

export default OrderPlaced
