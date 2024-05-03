import React, { useContext, useState } from "react";
import { Appcontext } from "../../App";
import EditCategoryDialog from "../Dialog/EditCategoryDialog";
import AddCategoryDialog from "../Dialog/AddCategoryDialog";
import DeleteCategoryDialog from "../Dialog/DeleteCategoryDialog";

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
    <div className="manage-main-dialog-box">
      <div>
        <h1>Edit Category</h1>
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
            <p className="col-span-2">{eachCategory.categoryName}</p>
            <div className="w-full flex justify-center">
              <button
                onClick={(e) => showModalCategory(eachCategory, e)}
                className="edit-btn"
              >
                EDIT
              </button>
            </div>
            <div className="delete-btn-outer-div">
              <button
                className="delete-btn"
                onClick={(e) => showModalCategory(eachCategory, e)}
              >
                DELETE
              </button>
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
