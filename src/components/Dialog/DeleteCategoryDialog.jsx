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
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="dialog-panel bg-gray-500 p-10">
          <Dialog.Title className="pb-5"></Dialog.Title>
          <p>{`Confirm Delete: ${selectedCategoryName}?`} </p>
          <br />
          <button
            className="dialog-button mr-3 px-2"
            onClick={() => {
              handleDeleteCategory(categoryId, userToken);
            }}
          >
            Delete
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

export default DeleteCategoryDialog;
