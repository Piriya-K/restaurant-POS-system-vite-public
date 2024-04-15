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
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="dialog-panel bg-gray-500 p-10">
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
          <br />
          <button
            className="dialog-button mr-3 px-2"
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

export default AddCategoryDialog;
