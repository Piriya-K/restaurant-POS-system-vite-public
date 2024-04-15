import { Dialog } from "@headlessui/react";
import editCategory from "../../services/editCategory";
import { useState, useContext } from "react";
import { Appcontext } from "../../App";

const EditCategoryDialog = ({
  isOpen,
  onClose,
  selectedCategoryName,
  categoryId,
  updateCategoryName,
}) => {
  const [editResponse, setEditResponse] = useState("");
  const { userToken } = useContext(Appcontext);

  const handleEditCategory = async (newCategoryName, categoryId, userToken) => {
    try {
      const response = await editCategory(
        newCategoryName,
        categoryId,
        userToken
      );
      setEditResponse(response.message);
      updateCategoryName(categoryId, newCategoryName);
    } catch (error) {
      setEditResponse("Error editing category.");
    }
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="dialog-panel bg-gray-500 p-10">
          <Dialog.Title className="pb-5">Edit Category</Dialog.Title>
          <label>
            Name:{" "}
            <input
              id="catNameInput"
              type="text"
              defaultValue={selectedCategoryName}
              autoComplete="off"
              onClick={() => {
                (document.getElementById("catNameInput").className =
                  "bg-white"),
                  setEditResponse("");
              }}
            />
          </label>
          <br />
          <button
            className="dialog-button mr-3 px-2"
            onClick={() => {
              document.getElementById("catNameInput").value.length > 0
                ? handleEditCategory(
                    document.getElementById("catNameInput").value,
                    categoryId,
                    userToken
                  )
                : (((document.getElementById("catNameInput").className =
                    "bg-red-300"),
                  document.getElementById("catNameInput").focus()),
                  setEditResponse("Category name cannot be empty!"));
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

export default EditCategoryDialog;
