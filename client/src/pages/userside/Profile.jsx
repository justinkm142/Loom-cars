import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import {VscAccount} from 'react-icons/vsc'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {signout} from '../../redux/userSlice'


function Profile() {

  const name = useSelector((state)=>state.user.name)
  const email = useSelector((state)=>state.user.email)
  const phone = useSelector((state)=>state.user.phone)
  
  const dispach = useDispatch()

const handleLogOut = ()=>{

    localStorage.removeItem("token");
    dispach(signout())

    navigate('/user/home')

}





  const navigate= useNavigate()
  return (
    <div>
      <div className="bg-[#f5f5f5] h-full  grid grid-cols-12 gap-2 ">

        <div className="border-2  col-span-3 m-10 bg-white hidden md:block"> 
          <div className="w-full h-48 border-b-2 ">
               <div className=" flex flex-col justify-center items-center py-5">

                  <VscAccount size={80}/>
                  <h1 className="">{name}</h1>
                  <p className="">{email}</p> 
                  <p className="">{phone}</p>

               </div>

                
              
            
          </div>
          <div className="ps-12 pt-5">
              <ol className='font-medium text-xl'>
                <li className='mt-5 cursor-pointer hover:bg-gray-300'onClick={()=>{
                      
                      navigate("/user/profile/home") ;
                    }}
                
                >Account</li>
                <li className='mt-10 cursor-pointer hover:bg-gray-300'onClick={()=>{
                      
                      navigate("/user/profile/booking") ;
                    }}
                >My Bookings</li>
                <li className='mt-10 cursor-pointer hover:bg-gray-300' onClick={()=>{
                      
                      navigate("/user/profile/wallet") ;
                    }}
                >My Wallet</li>
                <li className='mt-10 mb-5 cursor-pointer hover:bg-gray-300' onClick={()=>{
                          handleLogOut();
                          // navigate("/user/logout") ;
                        }}
                >Logout</li>
              </ol>



          </div>
        
        
        
        </div>
        <div className=" border-2 col-span-9 mt-10 mr-10 mb-10 bg-white">        
        
              <Outlet /> 
        
        </div>


      </div>




    </div>
  )
}

export default Profile
