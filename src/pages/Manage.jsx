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
      <div className="manage-div1">
        <div className="manage-div2">
          <div className="manage-div3">
            <button
              onClick={() => handleManageCategoryClick()}
              className={
                showManageCat == true
                  ? "manage-btn-clicked"
                  : "manage-btn-unclicked"
              }
            >
              Manage Category
            </button>
            <button
              onClick={() => handleManageItemClick()}
              className={
                showManageItem == true
                  ? "manage-btn-clicked"
                  : "manage-btn-unclicked"
              }
            >
              Manage Item
            </button>
          </div>
          <div className="manage-div4">
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
