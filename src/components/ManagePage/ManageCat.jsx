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
    <div className="panel my-5 mx-10 px-5 py-2 border border-dashed border-black h-96">
      <div>
        <h1>Edit Category</h1>
        <div className="py-2">
          <button
            className="bg-gray-400 rounded-md px-4"
            onClick={(e) => showModalCategory(null, e)}
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll max-h-60">
        {category.map((eachCategory) => (
          <div className="grid grid-cols-3 gap-5 my-2" key={eachCategory._id}>
            <p>{eachCategory.categoryName}</p>
            <div className="w-full flex justify-center">
              <button
                onClick={(e) => showModalCategory(eachCategory, e)}
                className="bg-gray-400 rounded-md px-4"
              >
                EDIT
              </button>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="bg-red-400 rounded-md px-2"
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
