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
        <section className="regis-success-section">
          <div className="regis-success-div">
            <h1>Registration Successful!</h1>
            <br />
            <p className="text-center">
              {
                <Link to="/login" className="regis-link-text-color">
                  Sign-In Here!
                </Link>
              }
            </p>
          </div>
        </section>
      ) : (
        <section className="regis-section">
          <div className="regis-div1">
            <form className="regis-form">
              <h1 className="regis-h1">REGISTER</h1>
              <p className="regis-error-message regis-text" id="response">
                {errorMessage}
              </p>
              <div>
                <label className="regis-text" htmlFor="username">
                  Username:{" "}
                </label>
                <br />
                <input
                  id="username"
                  autoComplete="off"
                  type="text"
                  required
                  className="regis-input-field regis-text"
                  onChange={checkUsername}
                />
                <br />
                <br />
                <label className="regis-text" htmlFor="password">
                  Password:{" "}
                </label>
                <br />
                <input
                  id="password"
                  autoComplete="off"
                  type="text"
                  required
                  className="regis-input-field regis-text"
                  onChange={checkUsername}
                />
                <br />
                <br />
                <label className="regis-text" htmlFor="confirm">
                  Password Confirmation:{" "}
                </label>
                <br />
                <input
                  id="confirm"
                  autoComplete="off"
                  type="text"
                  required
                  className="regis-input-field regis-text"
                  onChange={checkUsername}
                />
                {/* <br />
                <br /> */}
                <div className="regis-div3">
                  <button
                    ahref="#"
                    className="regis-submit-btn regis-text"
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
            <p className="regis-text-2">
              Already registered?{" "}
              {
                <Link
                  to="/login"
                  className="regis-link-text-color regis-text-2"
                >
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
