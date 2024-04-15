import { Dialog } from "@headlessui/react";
import editItem from "../../services/editItem";
import { useState, useContext } from "react";
import { Appcontext } from "../../App";

const EditItemDialog = ({
  isOpen,
  onClose,
  updateItemInList,
  category,
  selectedItem,
}) => {
  const { userToken } = useContext(Appcontext);
  const [editResponse, setEditResponse] = useState("");

  const handleEditItem = async (
    itemName,
    categoryId,
    itemPrice,
    itemId,
    userToken
  ) => {
    try {
      const response = await editItem(
        itemName,
        categoryId,
        itemPrice,
        itemId,
        userToken
      );
      setEditResponse(response.message);
      updateItemInList(categoryId, itemName, itemPrice, itemId);
    } catch (error) {
      setEditResponse("Error editing item.");
    }
  };

  const inputValidation = (
    itemName,
    itemCategory,
    itemPrice,
    itemid,
    userToken
  ) => {
    itemName.length > 0 && itemPrice.length > 0
      ? handleEditItem(itemName, itemCategory, itemPrice, itemid, userToken)
      : itemName.length > 0 && itemPrice.length < 1
      ? (((document.getElementById("itemPriceInput").className =
          "bg-red-300 my-1 mx-2"),
        document.getElementById("itemPriceInput").focus()),
        setEditResponse("Item price cannot be empty!"))
      : itemName.length < 1 && itemPrice.length > 0
      ? (((document.getElementById("itemNameInput").className = "bg-red-300"),
        document.getElementById("itemNameInput").focus()),
        setEditResponse("Item name cannot be empty!"))
      : (((document.getElementById("itemNameInput").className = "bg-red-300"),
        (document.getElementById("itemPriceInput").className =
          "bg-red-300 my-1 mx-2")),
        setEditResponse("Item name & price cannot be empty!"));
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="dialog-panel bg-gray-500 p-10">
          <Dialog.Title className="pb-5">Edit Item</Dialog.Title>
          <label>
            Name:{" "}
            <input
              id="itemNameInput"
              type="text"
              defaultValue={selectedItem.itemName}
              onClick={() => {
                (document.getElementById("itemNameInput").className =
                  "bg-white"),
                  setEditResponse("");
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
              defaultValue={selectedItem.itemPrice}
              className="my-1 mx-2"
              onClick={() => {
                (document.getElementById("itemPriceInput").className =
                  "bg-white my-1 mx-2"),
                  setEditResponse("");
              }}
              autoComplete="off"
            />
          </label>
          <br />
          <div className="mt-2">
            <label>
              Category:{" "}
              <select
                id="categoryIdInput"
                defaultValue={selectedItem.categoryId}
              >
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
              inputValidation(
                itemName,
                itemCategory,
                itemPrice,
                selectedItem._id,
                userToken
              );
            }}
          >
            Save
          </button>
          <button className="dialog-button px-5" onClick={onClose}>
            Cancel
          </button>
          {editResponse && (
            <>
              <br />
              <br />
              <p>{editResponse}</p>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditItemDialog;
