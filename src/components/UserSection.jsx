import React, { useContext, useState } from "react";
import { Appcontext } from "../App";
import { Link } from "react-router-dom";
import EditProfileDialog from "./Dialog/EditProfileDialog";

const UserSection = () => {
  const { user, setUser } = useContext(Appcontext);
  const { imageFile } = useContext(Appcontext);
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = () => {
    setUser(null);
    localStorage.clear();
  };

  const showModalEditProfile = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div id="user-section" className="flex ml-4 items-center">
        <div id="user-profile-image" className="">
          <img src={imageFile} className="max-w-12 max-h-12" />
        </div>
        <div id="user-info" className=" pl-2">
          <div id="user-greeting" className="">
            <p className="">
              Hello,
              <span className="text-blue-400">
                {user ? " " + user.userName : null}
              </span>
            </p>
          </div>
          <div id="user-option" className="flex gap-2 justify-around">
            <Link
              to="#"
              className="hover:underline hover:scale-110 duration-300"
              onClick={() => showModalEditProfile()}
            >
              My Profile
            </Link>
            <Link
              to="/login"
              className="hover:underline duration-300 hover:scale-110"
              onClick={handleSignOut}
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
      {isOpen ? (
        <EditProfileDialog isOpen={isOpen} onClose={closeModal} />
      ) : null}
    </>
  );
};

export default UserSection;
