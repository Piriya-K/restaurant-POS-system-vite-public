import React, { useState } from "react";
import { Link } from "react-router-dom";
import registerUser from "../services/registerUser";
import checkDuplicateUsername from "../services/checkDuplicateUsername";

const Register = () => {
  const [setUser] = useState({});
  const imageFilePath = `user.webp`;
  const [success, setSuccess] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const checkUsername = async () => {
    let userNameCheckResponse = null;

    setErrorMessage("");
    const username = document.getElementById("username").value;
    const pass1 = document.getElementById("password").value;
    const pass2 = document.getElementById("confirm").value;

    try {
      if (username.length > 0) {
        userNameCheckResponse = await checkDuplicateUsername(username);
      } else {
        setErrorMessage("Username can't be empty!");
        setSubmitDisabled(true);
      }

      if (userNameCheckResponse != null && userNameCheckResponse != undefined) {
        setErrorMessage("Username taken!");
        setSubmitDisabled(true);
      } else if (
        userNameCheckResponse != null &&
        userNameCheckResponse != undefined &&
        (pass1 == pass2 || pass1 != pass2)
      ) {
        setErrorMessage("Username taken!");
        setSubmitDisabled(true);
      } else if (
        userNameCheckResponse == null &&
        userNameCheckResponse == undefined &&
        pass1 != pass2
      ) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const pass1 = document.getElementById("password").value;
    const pass2 = document.getElementById("confirm").value;

    if (username.length > 0 && pass1.length > 0 && pass2.length > 0) {
      (async () => {
        try {
          const response = await registerUser(username, pass1, imageFilePath);

          !response
            ? setUser({
                userName: username,
                password: pass1,
                imageFile: imageFilePath,
              })
            : null;
          setSuccess(true);
        } catch (err) {
          console.log(err.message);
        }
      })();
    } else {
      setErrorMessage("Inputs can't be empty!");
    }
  };

  return (
    <>
      {success ? (
        <section className="bg-blue-500 h-screen flex flex-col place-content-center">
          <div className="bg-slate-300 rounded-2xl w-1/4 h-1/4 mx-auto my-0 flex flex-col place-content-center items-center">
            <h1>Registration Successful!</h1>
            <br />
            <p className="text-center text-xs">
              {
                <Link to="/login" className="text-emerald-700">
                  Sign-In Here!
                </Link>
              }
            </p>
          </div>
        </section>
      ) : (
        <section className="bg-blue-500 h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <form className="bg-slate-300 rounded-2xl flex flex-col justify-center items-center w-[30dvw] h-[60dvh]">
              <h1 className="">REGISTER</h1>
              <p
                className="text-red-600 h-[5dvh] bg-green-300 w-auto flex justify-center items-center"
                id="response"
              >
                {errorMessage}
              </p>
              <div className="self-center">
                <label htmlFor="username">Username: </label>
                <br />
                <input
                  id="username"
                  autoComplete="off"
                  type="text"
                  required
                  className="rounded-lg border border-black"
                  onChange={checkUsername}
                />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <br />
                <input
                  id="password"
                  autoComplete="off"
                  type="text"
                  required
                  className="rounded-lg border border-black"
                  onChange={checkUsername}
                />
                <br />
                <br />
                <label htmlFor="confirm">Password Confirmation: </label>
                <br />
                <input
                  id="confirm"
                  autoComplete="off"
                  type="text"
                  required
                  className="rounded-lg border border-black"
                  onChange={checkUsername}
                />
                <br />
                <br />
                <div className="flex justify-center">
                  <button
                    ahref="#"
                    className="border rounded-lg w-[10dvw] h-[5dvh] bg-emerald-500 text-white"
                    onClick={handleSubmit}
                    id="submitBtn"
                    disabled={submitDisabled}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
            <br />
            <p>
              Already registered?{" "}
              {
                <Link to="/login" className="text-emerald-500">
                  Sign-In Here!
                </Link>
              }
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
