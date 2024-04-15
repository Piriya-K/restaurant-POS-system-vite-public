import React, { useContext } from "react";
import { Appcontext } from "../../App";

const LeftPanel = ({ onCategoryClick }) => {
  //for useContext
  const { category } = useContext(Appcontext);

  const handleClick = (eachCategory) => {
    onCategoryClick(eachCategory);
  };

  return (
    <div className="panel">
      <div className="panel-inner overflow-y-scroll h-[20rem]">
        {category.map((eachCategory) => (
          <div key={eachCategory._id}>
            <button
              className="panel-button-yellow panel-button w-full"
              type="button"
              onClick={() => handleClick(eachCategory)}
            >
              {eachCategory.categoryName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
