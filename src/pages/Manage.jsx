import { React, useState, useContext, useEffect } from "react";
import ManageCat from "../components/ManagePage/ManageCat";
import ManageItem from "../components/ManagePage/ManageItem";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../App";

const Manage = () => {
  const navigate = useNavigate();
  const { userToken } = useContext(Appcontext);
  const [showManageCat, setShowManageCat] = useState(true);
  const [showManageItem, setShowManageItem] = useState(false);

  const handleManageCategoryClick = () => {
    setShowManageCat(true);
    setShowManageItem(false);
  };
  const handleManageItemClick = () => {
    setShowManageItem(true);
    setShowManageCat(false);
  };

  useEffect(() => {
    userToken ? null : navigate(`/login`);
  }, []);

  return (
    <>
      <NavBar />
      <div className="text-xs flex h-dvh items-center">
        <div className="flex flex-col justify-items-center">
          <button
            onClick={() => handleManageCategoryClick()}
            className={
              showManageCat == true
                ? "bg-green-400 rounded-md px-4 mx-10 my-2"
                : "bg-gray-400 rounded-md px-4 mx-10 my-2"
            }
          >
            Manage Category
          </button>
          <button
            onClick={() => handleManageItemClick()}
            className={
              showManageItem == true
                ? "bg-green-400 rounded-md px-4 mx-10 my-2"
                : "bg-gray-400 rounded-md px-4 mx-10 my-2"
            }
          >
            Manage Item
          </button>
        </div>
        <div className="w-full">
          {showManageCat ? <ManageCat /> : null}
          {showManageItem ? <ManageItem /> : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Manage;
