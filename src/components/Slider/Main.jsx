import React from 'react'
import './Main.css'
import Slider from './Slider'


const Main = ({data,mainHeight,mainWidth,imgWidth}) => {
  return (
    <div className='main-slider' style={{height:mainHeight,width:mainWidth||"100%"}} >
      <Slider  data={data}  imgWidth={imgWidth}  duration={3000}  />
    </div>
  )
}

export default Main;
