import React, { useState } from 'react'

import LoginWindow from '../../componants/user/LoginWindow'
import Modal from '../../componants/user/Modal-OtpLogin'


function Login() {
  const [showModal,setShowModal] = useState(false)
  return (
    <div className='bg-black h-screen'>

     <LoginWindow setShowModal={setShowModal}  />
     <Modal visible={showModal} handleClose={setShowModal}/>
    </div>
  )
}

export default Login
