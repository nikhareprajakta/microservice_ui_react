import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none
        left-0"
      >
        Menu
        <svg
          className="ml-2 -mr-1 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={`origin-top-left absolute  mt-2 w-[220px] h-[600px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
        transition-all duration-300 ease-out transform 
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <ul className="py-1">
          <li>
            <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Dashboard
            </a>
          </li>
          <li >
            <NavLink 
            onClick={() => toggleDropdown} 
            to="/messageList" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </NavLink >
          </li>
          <li>
           <NavLink to="/messageList" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Message List
            </NavLink>
          </li>
          <li>
            <hr className="border-gray-200 my-1" />
          </li>
          <li>
            <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
