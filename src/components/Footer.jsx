import React from "react";
import "../styles/footer.scss";

import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { BsTwitter, BsApple } from "react-icons/bs";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import logo from "../images/logo-white.png";

const Footer = () => {
  return (
    <div className="footer"> 
    <div style={{margin:"0 auto"}} > <img  style={{width:"200px"}} src={logo} alt="" /></div>
 
     <p>Our purpose is To Sustainably Make the Pleasure and Benifits of <br/> Sports Accessible to the Many</p>
      <div className="main-footer">
       
        <div>
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Contact </li>
            <li>Store </li>
            <li>Locations </li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h3>Categories</h3>
          <ul>
            <li>Accessories</li>
            <li>Mi Phones</li>
            <li>iPhones</li>
            <li>Laptops</li>
            <li>Footwear</li>
            <li>Top wear</li>
          </ul>
        </div>
        <div>
          <h3>Get Help</h3>
          <ul>
            <li>Order Tracking</li>
            <li>FAQ’s</li>
            <li>Privacy Policy </li>
            <li>Term & Conditions </li>
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li>11 20th Street N.W, Suite 400</li>       
            <li className="phone-no"> +98 0 9876 0954</li>
            <li>hopify@arrowhitech.com</li>
          <li><div >Social: <AiFillFacebook/><AiFillInstagram/><BsTwitter/></div> </li>
          </ul>
        </div>
      </div>
      <div>
      ©2023 REDStore– All right reserved

      </div>
    </div>
  );
};

export default Footer;
