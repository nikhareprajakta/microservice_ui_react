import React from "react";
import { NavLink } from "react-router-dom";

function DropdownMenu({ label, items, menuKey, openMenu, toggleMenu}) {

const isOpen = openMenu === menuKey;

const handleClick = (item) => {
  if (item.onClick) {
    item.onClick();   // 👉 logout runs here
  } else if (item.path) {
    navigate(item.path);
  }

  toggleMenu(null);   // close menu
};
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
       onClick={() => toggleMenu(menuKey)}
        className="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        {label}
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
        className={`origin-top-right absolute  mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
        transition-all duration-300 ease-out transform 
        ${isOpen  ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        
        <ul className="py-1">
  {items.map((item, index) => (
    <li
      key={index}
       onClick={() => handleClick(item)}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {/* 👇 If item has children → NOT a NavLink */}
      {item.children ? (
        <span className="cursor-pointer font-semibold">
          {item.label}
        </span>
      ) : (
        <NavLink to={item.path}>{item.label}</NavLink>
      )}

      {/* 👇 Submenu */}
      {item.children && (
        <ul className="ml-4">
          <DropdownMenu
  label={item.label}
  items={item.children}
  menuKey={menuKey + "-" + index}
  openMenu={openMenu}
  toggleMenu={toggleMenu}
/>
        </ul>
      )}
    </li>
  ))}
</ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
