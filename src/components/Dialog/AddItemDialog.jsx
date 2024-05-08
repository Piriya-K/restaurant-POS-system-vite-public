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
      ? (((document.getElementById("itemPriceInput").className = "bg-red-300"),
        document.getElementById("itemPriceInput").focus()),
        setAddResponse("Price can't be empty!"))
      : itemName.length < 1 && itemPrice.length > 0
      ? (((document.getElementById("itemNameInput").className = "bg-red-300"),
        document.getElementById("itemNameInput").focus()),
        setAddResponse("Name can't be empty!"))
      : (((document.getElementById("itemNameInput").className = "bg-red-300"),
        (document.getElementById("itemPriceInput").className = "bg-red-300")),
        setAddResponse("Inputs can't be empty!"));
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="dialog-panel-bg">
        <Dialog.Panel className="dialog-panel-item">
          <div className="flex flex-col">
            <div className="self-center">
              <Dialog.Title className="pb-5">Add an Item</Dialog.Title>
              <label>
                Name: <br />
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
              <div className="mt-2">
                <label>
                  Price: <br />
                  <input
                    id="itemPriceInput"
                    type="number"
                    required
                    onClick={() => {
                      (document.getElementById("itemPriceInput").className =
                        "bg-white"),
                        setAddResponse("");
                    }}
                    autoComplete="off"
                  />
                </label>
              </div>
              <div className="mt-2">
                <label>
                  Category: <br />
                  <select id="categoryIdInput" className="dialog-panel-selector">
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="outer-div-dialog-buttons">
                <button
                  className="dialog-button"
                  onClick={() => {
                    const itemName =
                      document.getElementById("itemNameInput").value;
                    const itemCategory =
                      document.getElementById("categoryIdInput").value;
                    const itemPrice =
                      document.getElementById("itemPriceInput").value;
                    inputValidation(
                      itemName,
                      itemCategory,
                      itemPrice,
                      userToken
                    );
                  }}
                >
                  Save
                </button>
                <button className="dialog-button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
            {addResponse && <p className="dialog-response">{addResponse}</p>}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddItemDialog;
