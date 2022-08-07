import React from 'react'
import logo from'./logo.png'
import './logo.css'

const Logo = () => {
  return (
    <div className='ma4 mt)'>
        <div className='logo'>
          <img className='logo-image' alt='logo' src={logo}/>
          <h3 className='logo-title'>TrackFace</h3>
        
        </div>
    </div>
  )
}

export default Logo