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
      ? (((document.getElementById("itemPriceInput").className = "bg-red-300"),
        document.getElementById("itemPriceInput").focus()),
        setEditResponse("Price can't be empty!"))
      : itemName.length < 1 && itemPrice.length > 0
      ? (((document.getElementById("itemNameInput").className = "bg-red-300"),
        document.getElementById("itemNameInput").focus()),
        setEditResponse("Name can't be empty!"))
      : (((document.getElementById("itemNameInput").className = "bg-red-300"),
        (document.getElementById("itemPriceInput").className = "bg-red-300")),
        setEditResponse("Name & price can't be empty!"));
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="dialog-panel-item">
          <div className="flex flex-col">
            <div className="self-center">
              <Dialog.Title className="pb-5">Edit Item</Dialog.Title>
              <label>
                Name:
                <br />
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
              <div className="mt-2">
                <label>
                  Price: <br />
                  <input
                    id="itemPriceInput"
                    type="number"
                    defaultValue={selectedItem.itemPrice}
                    onClick={() => {
                      (document.getElementById("itemPriceInput").className =
                        "bg-white"),
                        setEditResponse("");
                    }}
                    autoComplete="off"
                  />
                </label>
              </div>
              <div className="mt-2">
                <label>
                  Category:
                  <br />
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
                      selectedItem._id,
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
            {editResponse && <p className="dialog-response">{editResponse}</p>}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditItemDialog;
