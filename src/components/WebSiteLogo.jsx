import React from 'react'
import {FaShopify} from 'react-icons/fa'
import '../images/weblogo.scss'
const WebSiteLogo = ({fsize}) => {
  return (
      <span className='web-logo' style={{fontSize:fsize}}>
      <FaShopify/>  Shopify
      </span>
  )
}

export default WebSiteLogo
