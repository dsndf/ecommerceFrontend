import React from "react";
import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logo.png";

import {MdAccountCircle} from "react-icons/md";
import {MdSearch} from "react-icons/md";
import {MdAddShoppingCart} from "react-icons/md";


const options = {
  burgerColorHover: "#ff195e",
  
  logoWidth: "20vmax",
  navColor1: "#000000d1",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About", 
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "#fff",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon:true,
  profileIconColor:"#fff",
  ProfileIconElement:MdAccountCircle,
  searchIcon:true,
  searchIconColor: "#fff",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconColor: "#fff",
  CartIconElement:MdAddShoppingCart,
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
 
};

const Header = () => {
  return   (
<ReactNavbar {...options} />

  )

};

export default Header;