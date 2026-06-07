import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faBank,faBell,faSms } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./DropdownMenu";
import { Link, NavLink,useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useState,useEffect,useRef } from "react";
import { toast } from "react-toastify";
export default function Header() {
  const { isAuthenticated, logout } = useAuth();

   const location = useLocation();
  const userMenuRef = useRef();
  const navigate = useNavigate();

  const isAdmin = true;
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (menuKey) => {
  setOpenMenu((prev) => (prev === menuKey ? null : menuKey));
};

useEffect(() => {
  setOpenMenu(null);
}, [location.pathname]);


 useEffect(() => {
  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setOpenMenu(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const handleLogout = () => {
   logout();
     setOpenMenu(null); // close dropdown
    toast.success("Logged out successfully!");
    navigate("/login");
  };

 

const loginMenu = [
  {
    label: "Home",
    path: "/home"
  },
  {
    label: "Admin",
     path: "admin"
    
  },
  {
    label: "Checkout",
     onClick: handleLogout
    
  }
];

const settingMenu = [
  { label: "Home", path: "/home" },
  { label: "Profile", path: "/profile" }
];

const notificationMenu = [
  { label: "Email Notification", path: "/email" },
  { label: "SMS Notification", path: "/sms" }
];
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2";
  return (
    <header className="border-b border-gray-300 sticky top-0 z-20 bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4" >
        <a href="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faBank} className="h-8 w-8" />
          <span className="font-bold">E-Tech Bank</span>
        </a>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="flex space-x-6" ref={userMenuRef}>
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
            <li >
              {isAuthenticated ? (
               
                <DropdownMenu label="Settings" items={loginMenu} menuKey="loginKey"
  openMenu={openMenu}
  toggleMenu={toggleMenu}/>
            

              ) :(
                <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              ) }
              
            </li>
            <li>
              <NavLink to="/cart" className="text-primary py-2">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </NavLink>
            </li>
            <li>
                
            </li>
            <li>
              {isAuthenticated ? (<DropdownMenu label={<FontAwesomeIcon icon={faBell}/>} items={settingMenu}  menuKey="settings"
  openMenu={openMenu}
  toggleMenu={toggleMenu} />):""}
              </li>
            <li>
              {isAuthenticated ? (<DropdownMenu label={<FontAwesomeIcon icon={faSms}/>}  items={notificationMenu} menuKey="notification"
  openMenu={openMenu}
  toggleMenu={toggleMenu} />):""}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// export default Header;
