import { Dialog } from "@headlessui/react";
import editUser from "../../services/editUser";
import { useState, useContext, useEffect } from "react";
import { Appcontext } from "../../App";
import bcrypt from "bcryptjs";
import checkDuplicateUsername from "../../services/checkDuplicateUsername";

const EditProfileDialog = ({ isOpen, onClose }) => {
  const [editResponse, setEditResponse] = useState("");

  const { imageFile, setImageFile } = useContext(Appcontext);
  const { user, setUser } = useContext(Appcontext);
  const { userToken } = useContext(Appcontext);
  const [submitDisabled, setSubmitDisabled] = useState(false);

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

  const checkUsername = async () => {
    const password = document.getElementById("passWordInput").value;
    const confirmation = document.getElementById("confirmation").value;
    const username = document.getElementById("userNameInput").value;
    const usernameLength = username.length;

    console.log(`length is ${usernameLength}`);

    setEditResponse("");

    if (usernameLength > 0) {
      try {
        const userNameCheckResponse = await checkDuplicateUsername(username);

        //When the user edited the username input field, but then wants to retain the current username, the username is valid only if the password tied to the username found in the db is the same as the password in the JWT of the current session
        const sameUserName =
          userNameCheckResponse != null &&
          userNameCheckResponse != undefined &&
          userNameCheckResponse.password == user.password &&
          userNameCheckResponse.userName == user.userName;
        //a username is not a duplicate if userNameCheckResponse returns "null" or "undefined" (the username is not found in the database)
        const duplicateUsername =
          userNameCheckResponse != null &&
          userNameCheckResponse != undefined &&
          !sameUserName;

        //password and confirmation input fields has to have the same input values
        const samePassword = password === confirmation;

        if (!sameUserName) {
          setEditResponse("Username taken!");
          setSubmitDisabled(true);
        } else if (duplicateUsername) {
          setEditResponse("Username taken!");
          setSubmitDisabled(true);
        }

        if (!samePassword && confirmation.length < 1) {
          setEditResponse("Please reenter the same password!");
          setSubmitDisabled(true);
        } else if (!samePassword && confirmation.length > 0) {
          setEditResponse("Please enter the same password!");
          setSubmitDisabled(true);
        }

        if ((sameUserName || !duplicateUsername) && samePassword) {
          setEditResponse("");
          setSubmitDisabled(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (username.length < 1) {
      setEditResponse("Username can't be empty!");
      setSubmitDisabled(true);
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
    //if user did not enter an input for password, assign the hashed password to the password variable
    if (password.length < 1 && confirmation.length < 1) {
      password = user.password; //user.password is already hashed, can be assigned to the "password" variable directly
      console.log(`password is `);
    } else if (
      password.length > 0 &&
      confirmation.length > 0 &&
      password == confirmation
    ) {
      password = await bcrypt.hash(password, 10);
    }

    // console.log(`userName is ${userName}`);
    // console.log(`password is ${password}`);

    try {
      const editUserResponse = await editUser(
        userName,
        password,
        userId,
        imageFile,
        userToken
      );

      console.log(`editUserResponse is ${JSON.stringify(editUserResponse)}`);

      Object.keys(editUserResponse).length > 1
        ? (setEditResponse("Update Successful!"),
          setUser((prevUser) => {
            const updatedUser = {
              ...prevUser,
              userName: userName,
              password: password,
              imageFile: imageFile,
            };
            return updatedUser;
          }))
        : setEditResponse("Update Unsuccessful!");
    } catch (err) {
      setEditResponse(`error from EditProfileDialog ${err.message} + ${err}`);
    }
  };

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="dialog-panel-bg">
        <Dialog.Panel className="dialog-panel-profile">
          <div className="flex flex-col">
            <div className="self-center">
              <Dialog.Title className="pb-5">Edit Profile</Dialog.Title>
              <label>
                Username:
                <br />
                <input
                  id="userNameInput"
                  type="text"
                  defaultValue={user.userName}
                  autoComplete="off"
                  onChange={checkUsername}
                  size={25}
                  min={1}
                />
              </label>
              <div className="mt-2">
                <label>
                  New Password:
                  <br />
                  <input
                    id="passWordInput"
                    type="text"
                    className=""
                    autoComplete="off"
                    size={25}
                    onChange={checkUsername}
                  />
                </label>
              </div>
              <div className="mt-2">
                <label>
                  Re-enter New Password:
                  <br />
                  <input
                    id="confirmation"
                    type="text"
                    className="confirmation"
                    autoComplete="off"
                    size={25}
                    onChange={checkUsername}
                  />
                </label>
              </div>
              <div className="mt-2">
                <label>
                  Profile Picture:
                  <span className="flex flex-col">
                    <img src={imageFile} className="dialog-panel-profile-img" />
                    <input
                      id="profilePicture"
                      type="file"
                      className="border border-solid align-middle"
                      accept="image/*,.pdf,.jpg,.jpeg,.png"
                    />
                  </span>
                </label>
              </div>
            </div>
            <div className="outer-div-dialog-buttons">
              <button
                className="dialog-button"
                onClick={() => {
                  const userName =
                    document.getElementById("userNameInput").value;
                  const password =
                    document.getElementById("passWordInput").value;
                  const confirmation =
                    document.getElementById("confirmation").value;
                  //index 0 is the position of the "file" object being uploaded. The "name" field is where the file name is
                  const file =
                    document.querySelector("input[type=file]").files[0];
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
              <button className="dialog-button" onClick={onClose}>
                Cancel
              </button>
            </div>
            {editResponse && <p className="dialog-response">{editResponse}</p>}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditProfileDialog;
