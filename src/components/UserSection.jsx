import React, { useContext, useState } from "react";
import App, { Appcontext } from "../App";
import { Link } from "react-router-dom";
import EditProfileDialog from "./Dialog/EditProfileDialog";

const UserSection = () => {
  const { user, setUser } = useContext(Appcontext);
  const { imageFile } = useContext(Appcontext);
  const [isOpen, setIsOpen] = useState(false);
  const { table1, setTable1 } = useContext(Appcontext);
  const { table2, setTable2 } = useContext(Appcontext);

  const handleSignOut = () => {
    setUser(null);

    /* Code to set itemlist property of tables object to an empty array (clear value)*/

    /*    setTable1((prevTable1) => {
      const updatedTable1 = { ...prevTable1, itemlist: [] };
      return updatedTable1;
    });

    setTable2((prevTable2) => {
      const updatedTable2 = { ...prevTable2, itemlist: [] };
      return updatedTable2;
    });
*/

    localStorage.removeItem(`userToken`);
  };

  const showModalEditProfile = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div id="user-section" className="usersection-div1">
        <div id="user-profile-image">
          <img src={imageFile} className="usersection-img" />
        </div>
        <div id="user-info" className="usersection-div2">
          <div id="user-greeting">
            <p className="">
              <span className="user-greeting">Hello,</span>
              <span className="usersection-username">
                {user ? " " + user.userName : null}
              </span>
            </p>
          </div>
          <div id="user-option" className="usersection-div3">
            <Link
              to="#"
              className="usersection-link-animation"
              onClick={() => showModalEditProfile()}
            >
              My Profile
            </Link>
            <Link
              to="/login"
              className="usersection-link-animation"
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
