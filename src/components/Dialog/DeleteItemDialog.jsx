import { Dialog } from "@headlessui/react";
import deleteItem from "../../services/deleteItem";
import { useState, useContext } from "react";
import { Appcontext } from "../../App";

const DeleteItemDialog = ({
  isOpen,
  onClose,
  deleteItemFromList,
  selectedItem,
}) => {
  const [editResponse, setEditResponse] = useState("");
  const { userToken } = useContext(Appcontext);

  const handleDeleteItem = async (itemId, userToken) => {
    try {
      const response = await deleteItem(itemId, userToken);
      setEditResponse(response.message);
      {
        response.status === 200 ? deleteItemFromList(itemId) : null;
      }
    } catch (error) {
      setEditResponse("Error deleting item.");
    }
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="dialog-panel bg-gray-500 p-10">
          <Dialog.Title className="pb-5"></Dialog.Title>
          <p>{`Confirm Delete: ${selectedItem.itemName}?`} </p>
          <br />
          <button
            className="dialog-button mr-3 px-2"
            onClick={() => {
              handleDeleteItem(selectedItem._id, userToken);
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

export default DeleteItemDialog;
