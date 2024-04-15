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
    <section className="bg-blue-500 h-screen flex flex-col place-content-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 rounded-2xl w-1/4 mx-auto my-0 h-3/4 flex flex-col justify-evenly items-center"
      >
        <div className="flex flex-col items-center">
          <h1>SIGN-IN</h1>
          <span className="flex" id="message"></span>
        </div>
        <div className="text-sm sm:text-base self-center">
          <label htmlFor="username">Username: </label>
          <br />
          <input
            id="username"
            autoComplete="off"
            type="text"
            required
            className="rounded-lg border border-black"
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
          />
          <br />
          <br />
          <div className="flex justify-center">
            <button className="border rounded-lg w-2/3 bg-emerald-500 py-1 text-white">
              Submit
            </button>
          </div>
          <span className="flex justify-center"></span>
          <div id="signInDiv" className="flex justify-center"></div>
          <br />
        </div>
      </form>
      <br />
      <p className="text-center text-xs">
        Don't have an account?{" "}
        {
          <Link to="/register" className="text-emerald-500">
            Register Here!
          </Link>
        }
      </p>
    </section>
  );
};

export default Login;
