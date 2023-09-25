import { width } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{height:"100vh", display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center" }}>
      <h1>404 Not Found!</h1>
     <Link to="/" className='black-btn' style={{width:"auto"}} >Back to Home</Link>
    </div>
  )
}

export default NotFound
