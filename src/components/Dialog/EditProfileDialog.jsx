import { Dialog } from "@headlessui/react";
import editUser from "../../services/editUser";
import { useState, useContext } from "react";
import { Appcontext } from "../../App";
import bcrypt from "bcryptjs";

const EditProfileDialog = ({ isOpen, onClose }) => {
  const [editResponse, setEditResponse] = useState("");

  const { imageFile, setImageFile } = useContext(Appcontext);
  const { user, setUser } = useContext(Appcontext);
  const { userToken } = useContext(Appcontext);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await fetch(`${import.meta.env.VITE_API_URL}upload/`, {
        method: `POST`,
        body: formData,
      });

      setImageFile(`${import.meta.env.VITE_API_URL}images/${file.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  const checkUsername = async (e) => {
    const password = document.getElementById("passWordInput").value;
    const confirmation = document.getElementById("confirmation").value;

    e.preventDefault();
    setErrorMessage("");
    const username = document.getElementById("userNameInput").value;

    try {
      if (username.length > 0) {
      } else {
        setErrorMessage("Username cannot be empty!");
        setSubmitDisabled(true);
      }

      if (password != confirmation) {
        setErrorMessage("Please enter the same password!");
        setSubmitDisabled(true);
      } else {
        setErrorMessage("");
        setSubmitDisabled(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditProfile = async (
    userName,
    password,
    confirmation,
    userId,
    imageFile,
    userToken
  ) => {
    if (userName.length < 1) {
      setErrorMessage("Username cannot be empty!");
      setSubmitDisabled(true);
    }

    //if user did not enter an input for password, use password from user instead
    if (password.length < 1 && confirmation.length < 1) {
      password = user.password;
    } else {
      password = await bcrypt.hash(password, 10);
    }

    try {
      const editUserResponse = await editUser(
        userName,
        password,
        userId,
        imageFile,
        userToken
      );

      Object.keys(editUserResponse).length > 1
        ? window.alert("Update Successful!")
        : window.alert("Update Unsuccessful!");

      setUser({
        _id: userId,
        userName: userName,
        password: password,
        imageFile: imageFile,
        __v: 0,
      });
    } catch (err) {
      setEditResponse(`error from EditProfileDialog ${err.message} + ${err}`);
    }
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="dialog-panel bg-gray-500 p-10">
          <Dialog.Title className="pb-5">Edit Profile</Dialog.Title>
          <span className="flex justify-center text-red-400" id="response">
            {errorMessage}
          </span>
          <label>Username: </label>
          <br />
          <input
            id="userNameInput"
            type="text"
            defaultValue={user.userName}
            onClick={() => {
              (document.getElementById("userNameInput").className = "bg-white"),
                setEditResponse("");
            }}
            autoComplete="off"
            onChange={checkUsername}
            size={25}
            min={1}
          />
          <br />
          <label>New Password: </label>
          <br />
          <input
            id="passWordInput"
            type="text"
            className=""
            autoComplete="off"
            placeholder="skip to use current password"
            size={25}
            onChange={checkUsername}
          />
          <br />
          <label>Reenter New Password: </label>
          <br />
          <input
            id="confirmation"
            type="text"
            className="confirmation"
            autoComplete="off"
            placeholder="skip to use current password"
            size={25}
            onChange={checkUsername}
          />
          <br />
          <div className="mt-2">
            <label>Profile Picture: </label>
            <span className="flex">
              <img src={imageFile} className="max-w-10 max-h-10" />
              <input
                id="profilePicture"
                type="file"
                className="border border-solid align-middle"
                accept="image/*,.pdf,.jpg,.jpeg,.png"
              />
            </span>
          </div>
          <button
            className="dialog-button mr-3 px-2"
            onClick={() => {
              const userName = document.getElementById("userNameInput").value;
              const password = document.getElementById("passWordInput").value;
              const confirmation =
                document.getElementById("confirmation").value;
              //index 0 is the position of the "file" object being uploaded. The "name" field is where the file name is
              const file = document.querySelector("input[type=file]").files[0];
              !(file == null)
                ? (uploadImage(file),
                  handleEditProfile(
                    userName,
                    password,
                    confirmation,
                    user._id,
                    file.name,
                    userToken
                  ))
                : handleEditProfile(
                    userName,
                    password,
                    confirmation,
                    user._id,
                    user.imageFile,
                    userToken
                  );
            }}
            disabled={submitDisabled}
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

export default EditProfileDialog;
