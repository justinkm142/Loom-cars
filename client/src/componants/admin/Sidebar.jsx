import React from "react";
import { Link } from "react-router-dom";

let items = [
  "Dashboard",
  "Bookings",
  "Cars",
  "Users",
  "Reports",
  "VerifyCars",
  "Signout",
];

function Sidebar() {
  return (
    <div className="w-56 text-white bg-black h-screen">
      <ul className="text-center">
        {items.map((data,index) => {
          return (
            <li className="pb-3 pt-6 mb-3 block" key={index}>
              <Link to={`/admin/${data.toLowerCase()}`}>
              <div className="bg-zinc-700 w-40 mx-auto rounded-xl py-1 hover:bg-stone-400 active:bg-stone-900 hover:cursor-pointer border-2 border-green-500 shadow-md shadow-green-500 ">
                
                {data}
             
              </div>

              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
