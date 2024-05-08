import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="footer-outer-div">
      <div className="footer-inner-div">
        <div>
          Let's <br />
          Connect!
        </div>
        <a href="https://www.linkedin.com/in/piriya-kantong/">
          <BsLinkedin className="social-icon" />
        </a>
        <a href="https://github.com/Piriya-K">
          <FaGithub className="social-icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
