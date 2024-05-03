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
      <div className="panel-inner">
        {category.map((eachCategory) => (
          <button
            key={eachCategory._id}
            className="panel-button-yellow panel-button"
            type="button"
            onClick={() => handleClick(eachCategory)}
          >
            {eachCategory.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
