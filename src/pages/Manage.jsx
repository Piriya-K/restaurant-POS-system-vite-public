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
      <div className="flex justify-center h-[76dvh] items-center bg-slate-500">
        <div className="flex h-full w-[80%]">
          <div className="flex flex-col justify-center items-center  h-full w-[30%] ">
            <button
              onClick={() => handleManageCategoryClick()}
              className={
                showManageCat == true
                  ? "bg-gray-600 rounded-md px-4 mx-10 my-4 h-[13dvh] w-[50%] text-white animate-bounce"
                  : "bg-gray-400 rounded-md px-4 mx-10 my-4 h-[13dvh] w-[50%]"
              }
            >
              Manage Category
            </button>
            <button
              onClick={() => handleManageItemClick()}
              className={
                showManageItem == true
                  ? "bg-gray-600 rounded-md px-4 mx-10 my-4 h-[13dvh] w-[50%] text-white animate-bounce"
                  : "bg-gray-400 rounded-md px-4 mx-10 my-4 h-[13dvh] w-[50%]"
              }
            >
              Manage Item
            </button>
          </div>
          <div className="w-full flex justify-center self-center">
            {showManageCat ? <ManageCat /> : null}
            {showManageItem ? <ManageItem /> : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Manage;
