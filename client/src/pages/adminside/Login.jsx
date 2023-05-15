import React from 'react'
import Navbar from '../../componants/admin/Navbar'
import LoginWindow from '../../componants/admin/LoginWindow'

 

function Login() {
  return (
    <div className='bg-black h-screen'>
     < Navbar  />
     <div className='flex'>
     <img className='hidden lg:block md:object-contain' src="../../../photos/blackCar.png" alt='car Photo' ></img>
     <LoginWindow />
     </div>

    </div>
  )
}

export default Login
