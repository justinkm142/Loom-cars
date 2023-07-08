import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import {signout} from '../../redux/userSlice'


function Logout() {
const dispach = useDispatch()
let navigate = useNavigate()
useEffect(()=>{

    // localStorage.removeItem("token");
    // dispach(signout())

    // navigate('/user/home')
})

  return (
    <div>
      
    </div>
  )
}

export default Logout
