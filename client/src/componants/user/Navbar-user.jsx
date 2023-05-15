import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



function UserNavbar() {

  const name = useSelector((state)=>state.user.name)
  return (
    <header
      aria-label="Site Header"
      className="bg-black  border-zinc-700 border-b-2 h-[80px]"
    >
      <div className=" max-w-screen-xl ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex md:items-center ">
            <img
              className="py-6 px-6 mt-1 cursor-pointer h-16 hidden md:block"
              src="../../public/photos/menu1.png"
            ></img>
            <Link to='/user/home'>   
            <img
              className="py-3 mt-1 cursor-pointer h-14 "
              src="../../public/photos/Logo.png"
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
                  className="rounded-3xl bg-white px-5 py-2.5 text-sm font-medium md:text-[18px] text-black shadow"
                >
                  Become a Host
                </Link>
              </div>

              <Link
                to="/user/login"
                className="rounded-md bg-black px-5 py-2.5 text-sm font-medium md:text-[18px] text-white"
              >
                {name=="" ? "Login/Signup": `Hi ${name}`  }
              </Link>
            </div>

            <div className="block md:hidden">
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserNavbar;
