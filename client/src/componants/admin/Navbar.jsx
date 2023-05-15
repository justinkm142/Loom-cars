import React from "react";

function Navbar() {
  return (
    <nav className="h-20 bg-black flex border-zinc-700 border-b-2 ">
      <span className="text-white my-auto ps-5">Logo</span>
      <ul className="flex mx-auto my-auto">
        <li className="text-white">Admin Panel</li>
      </ul>
    </nav>
  );
}

export default Navbar;
