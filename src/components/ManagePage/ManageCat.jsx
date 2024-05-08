import React, { useContext, useState } from "react";
import { Appcontext } from "../../App";
import EditCategoryDialog from "../Dialog/EditCategoryDialog";
import AddCategoryDialog from "../Dialog/AddCategoryDialog";
import DeleteCategoryDialog from "../Dialog/DeleteCategoryDialog";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";

const ManageCat = () => {
  //for useContext
  const { category, setCategory } = useContext(Appcontext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const showModalCategory = (selectedCategory, e) => {
    e.target.innerText.toLowerCase() === "edit"
      ? (setIsOpen(!isOpen), setSelectedCategory(selectedCategory))
      : e.target.innerText.toLowerCase() === "add category"
      ? setIsOpen2(!isOpen2)
      : e.target.innerText.toLowerCase() === "delete"
      ? (setIsOpen3(!isOpen3), setSelectedCategory(selectedCategory))
      : null;
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const closeModal3 = () => {
    setIsOpen3(!isOpen3);
  };

  const updateCategoryName = (categoryId, newCategoryName) => {
    setCategory((prevCategory) =>
      prevCategory.map((cat) =>
        cat._id === categoryId ? { ...cat, categoryName: newCategoryName } : cat
      )
    );
  };

  const addCategoryName = (categoryId, CategoryName) => {
    const newCategory = {
      _id: `${categoryId}`,
      categoryName: `${CategoryName}`,
      __v: 0,
    };
    setCategory((prevCategory) => [...prevCategory, { ...newCategory }]);
  };

  const deleteCategoryName = (categoryId) => {
    setCategory((prevCategory) =>
      prevCategory.filter((cat) => cat._id !== categoryId)
    );
  };

  return (
    <div className="manage-main-dialog-box panel">
      <div>
        <h1 className="manage-h1">Edit Category</h1>
        <button
          className="add-button"
          onClick={(e) => showModalCategory(null, e)}
        >
          Add Category
        </button>
      </div>
      <div className="content-dialog-box">
        {category.map((eachCategory) => (
          <div
            className="manage-category-content-row-styling"
            key={eachCategory._id}
          >
            <p className="manage-p1">{eachCategory.categoryName}</p>
            <div className="manage-flex-just-center">
              {/* <button
                onClick={(e) => showModalCategory(eachCategory, e)}
                className="edit-btn"
              >
                EDIT
              </button> */}
              <HiMiniPencilSquare
                onClick={() => {
                  setIsOpen(!isOpen), setSelectedCategory(eachCategory);
                }}
                className="icon"
              />
            </div>
            <div className="delete-btn-outer-div">
              {/* <button
                className="delete-btn"
                onClick={(e) => showModalCategory(eachCategory, e)}
              >
                DELETE
              </button> */}

              <TiDelete
                onClick={() => {
                  setIsOpen3(!isOpen3), setSelectedCategory(eachCategory);
                }}
                className="icon"
              />
            </div>
          </div>
        ))}
      </div>
      {isOpen ? (
        <EditCategoryDialog
          isOpen={isOpen}
          onClose={closeModal}
          selectedCategoryName={selectedCategory.categoryName}
          categoryId={selectedCategory._id}
          updateCategoryName={updateCategoryName}
        />
      ) : null}
      {isOpen2 ? (
        <AddCategoryDialog
          isOpen={isOpen2}
          onClose={closeModal2}
          addCategoryName={addCategoryName}
        />
      ) : null}
      {isOpen3 ? (
        <DeleteCategoryDialog
          isOpen={isOpen3}
          onClose={closeModal3}
          categoryId={selectedCategory._id}
          selectedCategoryName={selectedCategory.categoryName}
          deleteCategoryName={deleteCategoryName}
        />
      ) : null}
    </div>
  );
};

export default ManageCat;
