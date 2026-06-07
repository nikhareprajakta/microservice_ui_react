import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faBank } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2";
  return (
    <header className="border-b border-gray-300 sticky top-0 z-20 bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <NavLink to="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faBank} className="h-8 w-8" />
          <span className="font-bold">E-Tech Bank</span>
        </NavLink>
        <nav className="flex items-center py-2 z-10">
          <ul className="flex space-x-6">
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
            <li>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-primary py-2">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// export default Header;
