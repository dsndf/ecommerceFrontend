import React from 'react'
import '../styles/SmallHead.scss'
const SmallHeading = ({text}) => {
  return (
    <div  className='small-heading' style={{ display: "flex", justifyContent: "center" }} >
    <h4
  
    >
         {text}
    </h4>
  </div>
  )
}

export default SmallHeading
