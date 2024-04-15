import React from "react";
import { Link } from "react-router-dom";
import UserSection from "./UserSection";

const NavBar = () => {
  return (
    <div className="text-sm bg-gray-200 h-14">
      <nav className="flex justify-between h-full">
        <UserSection />
        <ul className="flex gap-2 mr-5 ">
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
