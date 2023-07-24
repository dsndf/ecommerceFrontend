import React from 'react'
import {BsArrowRight,BsArrowLeft} from 'react-icons/bs'
import {FcNext,FcPrevious} from 'react-icons/fc'
const BtnSlider = ({moveSlide,direction}) => {
  return (
          <button className={direction==='prev'?"slider-btn-prev":'slider-btn-next'} onClick={moveSlide}>
         {direction==="prev"?<FcPrevious/>:<FcNext/>}

          </button>
  )
}

export default BtnSlider
