import React, { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import loginUser from "../services/loginUser";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../App";

//google authentication tutorial https://www.youtube.com/watch?v=roxC8SMs7HU

const Login = () => {
  const { setUser } = useContext(Appcontext);
  const { setImageFile } = useContext(Appcontext);
  const { setUserToken } = useContext(Appcontext);
  const navigate = useNavigate();
  let errorMessage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await loginUser(username, password);

    if (Object.keys(response).length > 1) {
      setUserToken(response.token.jwtToken);

      //Store the received token in local storage
      localStorage.setItem(`userToken`, response.token.jwtToken);

      setUser(jwtDecode(response.token.jwtToken)),
        setImageFile(
          `${import.meta.env.VITE_API_URL}images/${
            jwtDecode(response.token.jwtToken).imageFile
          }`
        ),
        navigate("/order");
    } else {
      const message = document.getElementById("message");
      message.style.color = `red`;
      message.innerText = "Invalid Login!";
    }
  };

  return (
    <section className="regis-section">
      <div className="regis-div1">
        <form onSubmit={handleSubmit} className="regis-form">
          <h1 className="regis-h1">SIGN-IN</h1>
          <p className="regis-error-message regis-text" id="message">
            {errorMessage}
          </p>
          <div>
            <label htmlFor="username" className="regis-text">
              Username:{" "}
            </label>
            <br />
            <input
              id="username"
              autoComplete="off"
              type="text"
              required
              className="regis-input-field regis-text"
            />
            <br />
            <br />
            <label htmlFor="password" className="regis-text">
              Password:{" "}
            </label>
            <br />
            <input
              id="password"
              autoComplete="off"
              type="text"
              required
              className="regis-input-field regis-text"
            />
            <br />
            <br />
            <div className="regis-div3">
              <button className="regis-submit-btn regis-text">Submit</button>
            </div>
          </div>
        </form>
        <br />
        <p className="regis-text-2">
          Don't have an account?{" "}
          {
            <Link to="/register" className="regis-link-text-color regis-text-2">
              Register Here!
            </Link>
          }
        </p>
      </div>
    </section>
  );
};

export default Login;
