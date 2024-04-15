import React, { useContext, useState } from "react";
import { Appcontext } from "../../App";
import AddItemDialog from "../Dialog/AddItemDialog";
import EditItemDialog from "../Dialog/EditItemDialog";
import DeleteItemDialog from "../Dialog/DeleteItemDialog";

const ManageItem = () => {
  //for useContext
  const { item, setItem } = useContext(Appcontext);

  const { category } = useContext(Appcontext);
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(false); //for edit item
  const [isOpen2, setIsOpen2] = useState(false); // for add item
  const [isOpen3, setIsOpen3] = useState(false); // for delete item

  const showModalItem = (eachItem, e) => {
    e.target.innerText.toLowerCase() === "edit"
      ? (setIsOpen(!isOpen), setSelectedItem(eachItem))
      : e.target.innerText.toLowerCase() === "add item"
      ? setIsOpen2(!isOpen2)
      : e.target.innerText.toLowerCase() === "delete"
      ? (setIsOpen3(!isOpen3), setSelectedItem(eachItem))
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

  const updateItemInList = (
    newCategoryId,
    newItemName,
    newItemPrice,
    itemId
  ) => {
    setItem((prevItem) =>
      prevItem.map((item) =>
        item._id === itemId
          ? {
              ...item,
              categoryId: newCategoryId,
              itemName: newItemName,
              itemPrice: newItemPrice,
            }
          : item
      )
    );
  };

  const addItemToList = (itemId, itemName, itemPrice, categoryId) => {
    const newItem = {
      _id: `${itemId}`,
      itemName: `${itemName}`,
      itemPrice: `${itemPrice}`,
      categoryId: `${categoryId}`,
      __v: 0,
    };
    setItem((prevItem) => [...prevItem, { ...newItem }]);
  };

  const deleteItemFromList = (itemId) => {
    setItem((prevItem) => prevItem.filter((item) => item._id !== itemId));
  };

  return (
    <div className="panel my-5 mx-10 px-5 py-2 border border-dashed border-black h-96 ">
      <div>
        <h1>Edit Item</h1>
        <div className="py-2 gap-2 flex">
          <button
            className="bg-gray-400 rounded-md px-4"
            onClick={(e) => showModalItem(null, e)}
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll max-h-80">
        {item.map((eachItem, index) => (
          <div key={index}>
            <div className="grid grid-cols-5 gap-5 my-2">
              <p>{eachItem.itemName}</p>
              <p>
                {category &&
                  category
                    .filter((cat) => cat._id === eachItem.categoryId)
                    .map((cat) => (
                      <span key={cat._id}>{cat.categoryName}</span>
                    ))}
              </p>
              <p className="text-center">${eachItem.itemPrice}</p>
              <div className="w-full flex justify-center">
                <button
                  onClick={(e) => showModalItem(eachItem, e)}
                  className="bg-gray-400 rounded-md px-4"
                >
                  EDIT
                </button>
              </div>
              <div className="w-full flex justify-center">
                <button
                  onClick={(e) => showModalItem(eachItem, e)}
                  className="bg-red-400 rounded-md px-2"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen ? (
        <EditItemDialog
          isOpen={isOpen}
          onClose={closeModal}
          updateItemInList={updateItemInList}
          category={category}
          selectedItem={selectedItem}
        />
      ) : null}
      {isOpen2 ? (
        <AddItemDialog
          isOpen={isOpen2}
          onClose={closeModal2}
          addItemToList={addItemToList}
          category={category}
        />
      ) : null}
      {isOpen3 ? (
        <DeleteItemDialog
          isOpen={isOpen3}
          onClose={closeModal3}
          deleteItemFromList={deleteItemFromList}
          selectedItem={selectedItem}
        />
      ) : null}
    </div>
  );
};

export default ManageItem;
