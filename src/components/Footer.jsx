import React from "react";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="px-2 bg-gray-200 h-[12dvh] flex justify-center">
      <div className="w-full flex justify-center items-center gap-2">
        <div>
          Let's <br />
          connect!
        </div>
        <a href="https://www.linkedin.com/in/piriya-kantong/">
          <BsLinkedin className="h-[10dvh] w-[5dvw]" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
