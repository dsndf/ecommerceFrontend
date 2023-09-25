import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { BiSearch, BiHeart } from "react-icons/bi";
import { SlHandbag } from "react-icons/sl";
import { RiDashboardFill } from "react-icons/ri";
import logo from "../images/logo.png";
import Search from "./Search";
import { useSelector } from "react-redux";


import { AiOutlineUser } from "react-icons/ai";
const Navbar = ({ isAuth }) => {
  const [search, setSearch] = useState(false);
  const { cart } = useSelector((state) => state.cartReducer);
  const { userData, isAuthenticated } = useSelector(
    (state) => state.userReducer
  );
  const { wishList } = useSelector((state) => state.wishListReducer);
  const closeSearch = () => {
    document.getElementById("search").style.height = "0px";

    setSearch(false);
  };
  return (
    <>
      {" "}
      {search ? <Search closeSearch={closeSearch} /> : null}
      <div className="nav-cont" id="navid">
        <nav>
          <img src={logo} style={{ width: "100px" }} alt="" />
          <ul className="home-opt">
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
            <Link to={"/products"}>Products</Link>
          </ul>

          <ul>
            <Link
              onClick={() => {
                document.body.style.overflowY = "hidden";
                setSearch(true);
              }}
            >
              <BiSearch />
            </Link>
          {
             userData?.role==="admin"? <Link
            to={'/admin/dashboard'}
            >
              <RiDashboardFill />
            </Link>:null

          } 
            <Link to={`${isAuth?'/account':'/login'}`}>
              {isAuthenticated ? (
                <img src={userData?.avatar?.url} alt="" />
              ) : (
                <AiOutlineUser />
              )}
            </Link>
            <Link to={"/wishList"}>
              {wishList.length > 0 ? (
                <span className="item-indicator">{wishList.length}</span>
              ) : null}
              <BiHeart />
            </Link>
            <Link to={"/cart"} className={"cart-icon-link"}>
              {cart.length > 0 ? (
                <span className="item-indicator">{cart.length}</span>
              ) : null}
              <SlHandbag />
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
