import React from "react";
import "../styles/Cart.scss";
import CartBox from "./CartBox";
import { Link } from "react-router-dom";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { MdAddCircle } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";
import { HiMinusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { setCartItemQuantity } from "../slices/cartSlice";
import { useEffect } from "react";
import { useState } from "react";
import  Heading from './Heading.jsx';
const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cartReducer);
  const { cart } = cartReducer;
  const setItemQuantity = (id, quantity, stocks) => {
    console.log(quantity);
    if (quantity <= stocks && quantity >= 1) {
      dispatch(setCartItemQuantity({ id, quantity }));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (cart.length) {
      let total = 0;
      if (cart.length > 1) {
        total = cart.reduce((acc, h1) => {
          return acc + h1.price * h1.quantity;
        }, 0);
      } else {
        total = cart[0].price * cart[0].quantity;
      }
      console.log("total is ", total);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <> 
      {" "}
      <div className="cart">
       
    <Heading text = "Shopping Cart"/>
    
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((v) => {
              return (
                <tr> 
                  <td>
                    <CartBox
                    key={v.product}
                      name={v.name}
                      image={v.image}
                      price={v.price}
                      product={v.product}
                    />
                  </td>
                  <td className="qty-btn">
                    <div>    <button
                      className="minusbtn"
                      onClick={() => {
                        setItemQuantity(v.product, v.quantity - 1, v.stocks);
                      }}
                    >
                    <GrSubtract/>
                    </button>
                    <input value={v.quantity} type="number" readOnly />
                    <button
                      className="addbtn"
                      onClick={() => {
                        setItemQuantity(v.product, v.quantity + 1, v.stocks);
                      }}
                    >
                      <GrAdd/>
                    </button></div>
                
                  </td>
                  <td>₹{v.price * v.quantity}.00</td>
                </tr>
              );
            })}
          </tbody>
        </table>{" "}
        <div className="grosstotal">
          <div>
            <h2>Gross Total</h2>
            <br />
            <h3>₹{totalPrice}.00</h3>
          </div>

          <br />
          <Link to={"/shipping"}>
            {" "}
            <button className="org-btn">
              Checkout Now <HiShoppingBag />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
