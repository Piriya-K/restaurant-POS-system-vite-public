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
      <div className="dialog-panel-bg">
        <Dialog.Panel className="dialog-panel-category">
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
          <div className="outer-div-dialog-buttons">
            <button
              className="dialog-button"
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
                    setEditResponse("Name can't be empty!"));
              }}
            >
              Save
            </button>
            <button className="dialog-button" onClick={onClose}>
              Cancel
            </button>
          </div>
          {editResponse && <p className="dialog-response">{editResponse}</p>}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditCategoryDialog;
