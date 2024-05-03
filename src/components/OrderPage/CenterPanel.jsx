import React, { useContext } from "react";
import { Appcontext } from "../../App";

const CenterPanel = ({ selectedMenu, onItemClick }) => {
  //for useContext
  const { item, setItem } = useContext(Appcontext);

  const handleClick = (item) => {
    onItemClick(item);
  };
  return (
    <div className="panel">
      {selectedMenu ? (
        <div className="panel-inner">
          {item.map((eachItem, index) =>
            eachItem.categoryId === selectedMenu._id ? (
              <button
                className="panel-button-blue panel-button"
                key={index}
                type="button"
                onClick={() => handleClick(eachItem)}
              >
                {eachItem.itemName}
              </button>
            ) : null
          )}
        </div>
      ) : (
        <p className="w-full m-5">No menu category selected</p>
      )}
    </div>
  );
};

export default CenterPanel;
