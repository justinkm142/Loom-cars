import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Signout() {
    
let navigate = useNavigate()
useEffect(()=>{
    localStorage.removeItem("admin_token");
    navigate('/admin/login')

})

  return (
    <div>
      
    </div>
  )
}

export default Signout
