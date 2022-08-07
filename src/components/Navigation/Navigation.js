import React from 'react'
import Logo from '../Logo/Logo'
import './navigation.css'

const Navigation = ({onRouteChange, isSignedIn}) => {
  
    if(isSignedIn){
      return(
        <nav>
          <Logo />
          <p  onClick={()=> onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      )
    } else{
      return(
      <nav>
      <Logo />
      <div style={{display: 'flex'}}>
        <p  onClick={()=> onRouteChange('signin')} className='f3 pa3 link dim black underline  pointer'>Sign In</p>
        <p  onClick={()=> onRouteChange('register')} className='f3 pa3 link dim black underline  pointer'>Register</p>
      </div>
      </nav>

      )
    }
  
}

export default Navigation