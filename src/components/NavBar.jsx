import React from "react";
import { Link } from "react-router-dom";
import UserSection from "./UserSection";

const NavBar = () => {
  return (
    <div className="bg-gray-200 w-screen h-[12dvh] flex">
      <nav className="flex justify-between w-screen">
        <UserSection />
        <ul
          id="page-selector"
          className="flex justify-between h-full "
        >
          <li className="navbar-button">
            {<Link to="/order">Order Page</Link>}
          </li>
          <li className="navbar-button">
            {<Link to="/manage">Menu Management</Link>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
