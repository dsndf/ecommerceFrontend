import React, { useState } from "react";
import "./CoolSlider.css";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useEffect } from "react";
const CoolSlider = ({setWidth,setHeight,data}) => {
  const [state, setState] = useState(1);

  useEffect(() => {
    let tid = setTimeout(() => {
      if (state === data.length) {
        setState(1);
      } else {
        setState(state + 1);
      }
    }, 2000);
    return () => {
   
      clearTimeout(tid);
    };
  });

  return (
    <>
 
    <div className="main-cool">
      <div className="main-CoolSlider"  style={{width:setWidth,height:setHeight}}>
        <div
          className="CoolSlider"
          style={{
            transform: `translateX(${
              -(state - 1) * (100 / data.length)
            }%)`,
          }}
        >
          {data.map((v, index) => {
            return (
              <div className="CoolSlider-slide">
                <img src={v} alt="" style={{width:setWidth}} />
              </div>
            );
          })}
        </div>
        <button
          className="CoolSlider-btn"
          onClick={() =>
            state === 1 ? setState(data.length) : setState(state - 1)
          }
        >
          <FcPrevious />
        </button>
        <button
          className="CoolSlider-btn rightbtn"
          onClick={() =>{       
             console.log("right-click")
            
           state === data.length ? setState(1) : setState(state + 1)}
     

          }
        >
          <FcNext />
        </button>
        <div className="cool-dots">
          {data.map((v, index) => {
            return (
              <div
                className={`${index + 1 === state ? "active-cool-dot" : ""}   cool-dot`}
                onClick={() => setState(index + 1)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default CoolSlider;
