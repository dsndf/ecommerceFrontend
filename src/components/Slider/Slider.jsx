import React, { useEffect, useState } from "react";
import BtnSlider from "./BtnSlider";
import "./Slider.css";

const Slider = ({data,duration,imgWidth}) => {
  const [state, setState] = useState(1);
  function nextSlide() {
    if (state == data.length) {
      setState(1);
    } else {
      setState(state + 1);
    }
  }
  function prevSlide() {
    if (state == 1) {
      setState(data.length);
    } else {
      setState(state - 1);
    }
  }
  useEffect(() => {
    let t = setTimeout(() => {
      if (state == data.length) {
        setState(1);
      } else {
        setState(state + 1);
      }
    }, duration);
    return () => {
      clearTimeout(t);
    };
  });
  return (
    <>
      <div className="slider" >
        {data.map((v, ind) => {
          return (
            <div  key={ind}
              className={`${
                state == ind + 1 ? "slide-anime" : "slide"
              }   slider-slide`}
            >
              <img src={v.url} alt="" style={{width:imgWidth||'100%'}}/>
            </div>
            // <div 
            //   className={`${
            //     state == ind + 1 ? "slide-anime" : "slide"
            //   }   slider-slide`}
            // >
            //   <img src={v.url} alt="" style={{width:imgWidth||'100%'}}/>
            // </div>
          );
        })}

        <BtnSlider direction={"prev"} moveSlide={prevSlide} />
        <BtnSlider direction={"next"} moveSlide={nextSlide} />
      </div>{" "}
      <div style={{display:'flex'}}>
      
        {data.map((v, ind) => {
          return <div key={ind} className={state===ind+1?"small-img active-small-img":"small-img"} >
            <img src={v.url} alt="" />
          </div>;
        })}
      </div>
    </>
  );
};

export default Slider;
