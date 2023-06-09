import React, {useState,useEffect} from 'react'
import Datepicker from "react-tailwindcss-datepicker"; 
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {signout} from '../../redux/userSlice'

import {
  MdOutlineAccountBalanceWallet, 
  MdOutlineDirectionsCar,
  MdLogin
} from 'react-icons/md'

import {
  FaUserPlus
} from 'react-icons/fa'

import {
  VscAccount
} from 'react-icons/vsc'

import {
  BiSupport
} from 'react-icons/bi'

import {
  BiLogOut
} from 'react-icons/bi'


function Modal_SidePanel({visible,modalClose}) {

  const [loading,setLoading] =useState(false)
  
 const navigate = useNavigate()
 const dispach = useDispatch()

 const name = useSelector((state)=>state.user.name)
 const email = useSelector((state)=>state.user.email)
  const phone = useSelector((state)=>state.user.phone)

  const handleClose = (e)=>{
    if(e.target.id=='container'){
      setLoading(false)
      modalClose()
    }
  }

  const signoutUser =  ()=>{

    localStorage.removeItem("token");
    dispach(signout())
    navigate('/user/home')

  }




  // if(!visible){
  //      return null; 
  // }

   


if(name){

  return(
    
    <div 
    id='container'
    onClick={handleClose}
    className={visible ?'bg-black bg-opacity-90 h-full w-full fixed inset-0 flex justify-start text-white z-10 ease-linear duration-500': "fixed left-[-100%]"  }>
      <div className={visible ? "h-screen w-1/2 md:w-1/4 bg-white  opacity-100 ":"fixed left-[-100%]" }>
        <div className=" ">
              <div className="bg-black h-20 pt-3  ">
                <h1 className='text-white font-medium text-lg ms-5 '>{name}</h1>
                    <div className="ps-10">
                        <p className="text-white text-sm">{email}</p>
                        <p className="text-white text-sm">{phone}</p>
                    </div>
              </div>
  
              <div className="text-black ps-10">
  
                  <ul className='font-medium text-2xl '>
                      <li className='mt-10 hover:bg-slate-300 cursor-pointer flex gap-3 items-center ' onClick={()=>{
                          modalClose() ; 
                          navigate("/user/profile/wallet") ;
                      }
                    }> <MdOutlineAccountBalanceWallet size={40} />Wallet</li>
                      <li className='mt-10 hover:bg-slate-300 cursor-pointer flex gap-3 items-center'onClick={()=>{
                          modalClose() ; 
                          navigate("/user/profile/booking") ;
                      }
                    }
                      ><MdOutlineDirectionsCar size={40}  /> My Bookings</li>
                      <li className='mt-10 hover:bg-slate-300 cursor-pointer flex gap-3 items-center' onClick={()=>{
                          modalClose() ; 
                          navigate("/user/profile/home") ;
                      }
                      }><VscAccount size={40}/>My Profile</li>
                      <li className='mt-10 hover:bg-slate-300 cursor-pointer flex gap-3 items-center'><BiSupport size={40}/> Help & Support</li>
                      <li className='mt-10 hover:bg-slate-300 cursor-pointer flex gap-3 items-center' onClick={()=>{
                          signoutUser();
                          modalClose() ; 
                          // navigate("/user/logout") ;
                        }
                          }>  <BiLogOut size={40} /> Logout </li> 
                  </ul>
              </div>
        </div>
      </div>
      
      <Toaster />
    </div>)


}else{

  return(
    
    <div 
    id='container'
    onClick={handleClose}
    className={visible ?'bg-black bg-opacity-90 h-full w-full fixed inset-0 flex justify-start text-white z-10 ease-linear duration-500': "fixed left-[-100%]"  }>
      <div className={visible ? "h-screen w-1/2 md:w-1/4 bg-white  opacity-100 ":"fixed left-[-100%]" }>
        <div className=" ">
              <div className="bg-black h-20 pt-3  ">
                <h1 className='text-white font-medium text-lg ms-5 '>{name}</h1>
                    <div className="ps-10">
                        <p className="text-white text-sm">{email}</p>
                        <p className="text-white text-sm">{phone}</p>
                    </div>
              </div>
  
              <div className="text-black ps-10">
  
                  <ul className='font-medium text-2xl '>
                      <li className='mt-10 hover:bg-slate-300 cursor-pointer flex gap-3 items-center ' onClick={()=>{
                          modalClose() ; 
                          navigate("/user/login") ;
                      }
                    }> <MdLogin size={40} />Login</li>
                      <li className='mt-10 hover:bg-slate-300 cursor-pointer flex gap-3 items-center'onClick={()=>{
                          modalClose() ; 
                          navigate("/user/signup") ;
                      }
                    }
                      ><FaUserPlus size={40}  /> SignUp</li>

                      {/* <li className='mt-10 hover:bg-slate-300 cursor-pointer flex gap-3 items-center'><BiSupport size={40}/> Help & Support</li> */}
                     
                  </ul>
              </div>
        </div>
      </div>
      
      <Toaster />
    </div>)


}



}

export default Modal_SidePanel
