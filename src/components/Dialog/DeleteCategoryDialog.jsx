import { Dialog } from "@headlessui/react";
import deleteCategory from "../../services/deleteCategory";
import { useState, useContext } from "react";
import { Appcontext } from "../../App";

const DeleteCategoryDialog = ({
  isOpen,
  onClose,
  categoryId,
  selectedCategoryName,
  deleteCategoryName,
}) => {
  const { userToken } = useContext(Appcontext);
  const [editResponse, setEditResponse] = useState("");

  const handleDeleteCategory = async (categoryId, userToken) => {
    try {
      const response = await deleteCategory(categoryId, userToken);
      setEditResponse(response.message);
      {
        response.status === 200 ? deleteCategoryName(categoryId) : null;
      }
    } catch (error) {
      setEditResponse("Error deleting category.");
    }
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="dialog-panel-bg">
        <Dialog.Panel className="dialog-panel-category">
          <Dialog.Title className="pb-5"></Dialog.Title>
          <p className="text-center">
            {`Confirm Delete: ${selectedCategoryName}?`}{" "}
          </p>
          <div className="outer-div-dialog-buttons">
            <button
              className="dialog-button"
              onClick={() => {
                handleDeleteCategory(categoryId, userToken);
              }}
            >
              Delete
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

export default DeleteCategoryDialog;
