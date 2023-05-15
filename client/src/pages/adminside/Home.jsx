import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../../componants/admin/Navbar'
import Sidebar from '../../componants/admin/Sidebar'

function Home() {
  return (
    <div>
      <Navbar />
      <div className='flex'>
      <Sidebar/>
      <Outlet />
      </div>
    </div>
  )
}

export default Home
