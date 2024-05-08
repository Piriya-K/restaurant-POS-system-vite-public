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
      <div className="dialog-panel-bg">
        <Dialog.Panel className="dialog-panel-item">
          <div className="flex flex-col">
            <div className="self-center">
              <Dialog.Title className="pb-5"></Dialog.Title>
              <p className="text-center">
                {`Confirm Delete: ${selectedItem.itemName}?`}{" "}
              </p>
              <div className="outer-div-dialog-buttons">
                <button
                  className="dialog-button"
                  onClick={() => {
                    handleDeleteItem(selectedItem._id, userToken);
                  }}
                >
                  Delete
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

export default DeleteItemDialog;
