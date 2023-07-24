import React from "react";
import "../styles/Banner.scss";
import image from "../images/gallery-2.jpg";
import { BsMouse } from "react-icons/bs";
import slides from "./Slider/slides";
import Main from "./Slider/Main";
import {TbFidgetSpinner} from 'react-icons/tb'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Banner = () => {
  return (
    <div className="hero">
 <Main data={slides} mainHeight={'110%'} mainWidth={"100%"} imgWidth={'100%'}  /> 
 <div className="banner-desc">
          <div >
          <p>Welcome to <span>VMart</span></p>
          <h1>Find Amazing Products Below</h1>
          <a href="#products">
            <button>
              Explore More.. <TbFidgetSpinner/>
            </button>
          </a>
        </div>

       </div>
    </div>
  );
};

export default Banner;
