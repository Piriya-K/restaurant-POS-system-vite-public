import { Dialog } from "@headlessui/react";
import addItem from "../../services/addItem";
import { useState, useContext } from "react";
import { Appcontext } from "../../App";

const AddItemDialog = ({ isOpen, onClose, addItemToList, category }) => {
  const [addResponse, setAddResponse] = useState("");
  const { userToken } = useContext(Appcontext);

  const handleAddItem = async (
    newItemName,
    categoryId,
    newItemPrice,
    userToken
  ) => {
    try {
      const response = await addItem(
        newItemName,
        categoryId,
        newItemPrice,
        userToken
      );
      setAddResponse(`${response.itemName} has been added!`);
      addItemToList(
        response._id,
        response.itemName,
        response.itemPrice,
        response.categoryId
      );
    } catch (error) {
      setAddResponse("Error adding item.");
    }
  };

  const inputValidation = (itemName, itemCategory, itemPrice, userToken) => {
    itemName.length > 0 && itemPrice.length > 0
      ? handleAddItem(itemName, itemCategory, itemPrice, userToken)
      : itemName.length > 0 && itemPrice.length < 1
      ? (((document.getElementById("itemPriceInput").className =
          "bg-red-300 my-1 mx-2"),
        document.getElementById("itemPriceInput").focus()),
        setAddResponse("Item price cannot be empty!"))
      : itemName.length < 1 && itemPrice.length > 0
      ? (((document.getElementById("itemNameInput").className = "bg-red-300"),
        document.getElementById("itemNameInput").focus()),
        setAddResponse("Item name cannot be empty!"))
      : (((document.getElementById("itemNameInput").className = "bg-red-300"),
        (document.getElementById("itemPriceInput").className =
          "bg-red-300 my-1 mx-2")),
        setAddResponse("Item name & price cannot be empty!"));
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="dialog-panel bg-gray-500 p-10">
          <Dialog.Title className="pb-5">Add an Item</Dialog.Title>
          <label>
            Name:{" "}
            <input
              id="itemNameInput"
              type="text"
              required
              onClick={() => {
                (document.getElementById("itemNameInput").className =
                  "bg-white"),
                  setAddResponse("");
              }}
              autoComplete="off"
            />
          </label>
          <br />
          <label>
            Price:{" "}
            <input
              id="itemPriceInput"
              type="number"
              required
              className="my-1 mx-2"
              onClick={() => {
                (document.getElementById("itemPriceInput").className =
                  "bg-white my-1 mx-2"),
                  setAddResponse("");
              }}
              autoComplete="off"
            />
          </label>
          <br />
          <div className="mt-2">
            <label>
              Category:{" "}
              <select id="categoryIdInput">
                {category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            className="dialog-button mr-3 px-2"
            onClick={() => {
              const itemName = document.getElementById("itemNameInput").value;
              const itemCategory =
                document.getElementById("categoryIdInput").value;
              const itemPrice = document.getElementById("itemPriceInput").value;
              inputValidation(itemName, itemCategory, itemPrice, userToken);
            }}
          >
            Save
          </button>
          <button className="dialog-button px-5" onClick={onClose}>
            Cancel
          </button>
          {addResponse && (
            <>
              <br />
              <br />
              <p>{addResponse}</p>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddItemDialog;
