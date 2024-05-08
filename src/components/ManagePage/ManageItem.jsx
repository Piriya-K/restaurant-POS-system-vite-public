import React, { useContext, useState } from "react";
import { Appcontext } from "../../App";
import AddItemDialog from "../Dialog/AddItemDialog";
import EditItemDialog from "../Dialog/EditItemDialog";
import DeleteItemDialog from "../Dialog/DeleteItemDialog";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";

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
    <div className="manage-main-dialog-box panel">
      <div>
        <h1 className="manage-h1">Edit Item</h1>
        <button className="add-button" onClick={(e) => showModalItem(null, e)}>
          Add Item
        </button>
      </div>

      <div className="content-dialog-box">
        {item.map((eachItem, index) => (
          <div key={index} className="manage-item-content-row-styling">
            <p className="manage-p1">{eachItem.itemName}</p>
            <p>
              {category &&
                category
                  .filter((cat) => cat._id === eachItem.categoryId)
                  .map((cat) => <span key={cat._id}>{cat.categoryName}</span>)}
            </p>
            <div className="manage-item-div1">
              <p className="manage-item-price">${eachItem.itemPrice}</p>
            </div>
            <div className="manage-flex-just-center">
              {/* <button
                onClick={(e) => showModalItem(eachItem, e)}
                className="edit-btn"
              >
                EDIT
              </button> */}

              <HiMiniPencilSquare
                onClick={() => {
                  setIsOpen(!isOpen), setSelectedItem(eachItem);
                }}
                className="icon"
              />
            </div>
            <div className="delete-btn-outer-div">
              {/* <button
                onClick={(e) => showModalItem(eachItem, e)}
                className="delete-btn"
              >
                DELETE
              </button> */}

              <TiDelete
                onClick={() => {
                  setIsOpen3(!isOpen3), setSelectedItem(eachItem);
                }}
                className="icon"
              />
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
