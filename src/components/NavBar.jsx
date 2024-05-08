import React from "react";
import { Link } from "react-router-dom";
import UserSection from "./UserSection";

const NavBar = () => {
  return (
    <div className="navbar-div">
      <nav className="navbar-nav">
        <UserSection />
        <ul
          id="page-selector"
          className="navbar-ul"
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
