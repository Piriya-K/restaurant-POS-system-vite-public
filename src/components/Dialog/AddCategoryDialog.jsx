import { Dialog } from "@headlessui/react";
import addCategory from "../../services/addCategory";
import { useState, useContext } from "react";
import { Appcontext } from "../../App";

const AddCategoryDialog = ({ isOpen, onClose, addCategoryName }) => {
  const { userToken } = useContext(Appcontext);
  const [addResponse, setAddResponse] = useState("");

  const handleAddCategory = async (newCategoryName, userToken) => {
    try {
      const response = await addCategory(newCategoryName, userToken);
      setAddResponse(`${response.categoryName} has been added!`);
      addCategoryName(response._id, response.categoryName);
    } catch (error) {
      setAddResponse("Error adding category.");
    }
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="dialog-panel-bg">
        <Dialog.Panel className="dialog-panel-category">
          <Dialog.Title className="pb-5">Add a Category</Dialog.Title>
          <label htmlFor="catNameInput">
            Name:{" "}
            <input
              id="catNameInput"
              type="text"
              required
              autoComplete="off"
              onClick={() => {
                (document.getElementById("catNameInput").className =
                  "bg-white"),
                  setAddResponse("");
              }}
            />
          </label>
          <div className="outer-div-dialog-buttons">
            <button
              className="dialog-button"
              onClick={() => {
                document.getElementById("catNameInput").value.length > 0
                  ? handleAddCategory(
                      document.getElementById("catNameInput").value,
                      userToken
                    )
                  : (((document.getElementById("catNameInput").className =
                      "bg-red-300"),
                    document.getElementById("catNameInput").focus()),
                    setAddResponse("Category name cannot be empty!"));
              }}
            >
              Save
            </button>
            <button className="dialog-button" onClick={onClose}>
              Cancel
            </button>
          </div>
          {addResponse && <p className="dialog-response">{addResponse}</p>}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddCategoryDialog;
