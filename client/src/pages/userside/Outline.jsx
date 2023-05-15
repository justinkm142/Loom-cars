import React from 'react'
import UserNavbar1 from '../../componants/user/Navbar-user'
import {Outlet} from 'react-router-dom'

function Outline() {
  return (
    <div>
          <UserNavbar1/>
          <Outlet />
    </div>
  )
}

export default Outline
