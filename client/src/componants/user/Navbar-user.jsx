import React, {useContext, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {AiOutlineMenu} from 'react-icons/ai'
import {UserContext} from '../../pages/userside/Outline'



function UserNavbar(props) {
  const {userDetails, setUserDeatils} = useContext(UserContext);
  const name = useSelector((state)=>state.user.name)
  // useEffect(()=>{
  //   let token = localStorage.getItem("token");
  //   if(!token){
  //     setUserDeatils({})
  //   }else {
  //     setUserDeatils({})
  //   }

  // },[])
  console.log("user Details in nav bar " , userDetails)
  return (
    <header
      aria-label="Site Header"
      className="bg-black  border-zinc-700 border-b-2 h-[80px]"
    >
      <div className=" max-w-screen-xl ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex md:items-center ">
            <div className="text-white p-4 cursor-pointer" onClick={()=>props.setModal(true)}>
            
            < AiOutlineMenu size={30} />

            </div>
           
            {/* <img
              onClick={()=>props.setModal(true)}
              className="py-6 px-6 mt-1 cursor-pointer h-16 hidden md:block"
              src="../../public/photos/menu1.png"
            ></img> */}
            <Link to='/user/home' >   
            <img
              className="py-3 mt-1 cursor-pointer h-14 "
              src="https://res.cloudinary.com/diefdj29l/image/upload/v1685874418/Logo_wim37r.png"
            ></img>


            
            </Link>

            <span className="text-white my-auto ps-1 font-bold text-4xl ">
              CARS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <div className="hidden sm:flex">
                <Link
                  to="/user/host"
                  target="_blank" rel="noopener noreferrer"
                  className="rounded-3xl bg-white px-5 py-2.5 text-sm font-medium md:text-[18px] text-black shadow"
                >
                  {userDetails.isHosted ? "Show my Cars": "Become a Host"}
                  
                </Link>
              </div>

              {name=="" ? 
              
              <Link
              to="/user/login"
              className="rounded-md bg-black px-5 py-2.5 text-sm font-medium md:text-[18px] text-white"
            >
              Login/Signup
            </Link>
              
              : 
              
              <Link
              to="/user/profile/home"
              className="rounded-md bg-black px-5 py-2.5 text-sm font-medium md:text-[18px] text-white"
            >
            {`Hi ${name}`}
            </Link>  
              }





              {/* <Link
                to="/user/login"
                className="rounded-md bg-black px-5 py-2.5 text-sm font-medium md:text-[18px] text-white"
              >
                {name=="" ? "Login/Signup": `Hi ${name}`  }
              </Link> */}
            </div>

            {/* <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserNavbar;
