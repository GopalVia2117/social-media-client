import { useContext, useRef } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/pathService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const {
    user,
    isFetching,
    error: contextError,
    dispatch,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const resetFields = () => {
    username.current.value = "";
    email.current.value = "";
    password.current.value = "";
    confirmPassword.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword.current.value === password.current.value) {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        const { data } = await axios.post(
          `${SERVER_DOMAIN}/api/auth/register`,
          user
        );
        console.log(data);
        setError("");
        setMessage(data);
      } catch (err) {
        setMessage("");
        console.log(err.response.data);
        setError(err.response.data);
      }
      resetFields();
    } else {
      setMessage("");
      setError("Passwords don't match");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-center bg-gray-300">
      <div className="w-96">
        <div className="w-full ">
          <h1 className="font-sans text-blue-600 text-4xl font-semibold">
            Socio
          </h1>
          <p className="text-md sm:my-4">
            Socio helps you connect and share with the people in your life.
          </p>
        </div>
        <div className="px-4 py-2 animate-pulse">
          {error && (
            <div className="w-full p-2 bg-red-500 text-white rounded-md">
              {error}
            </div>
          )}
          {message && (
            <div className="w-full p-2 bg-green-500 text-white rounded-md">
              {message}
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-white p-4 rounded-md w-full relative shadow-sm"
        >
          <input
            className="p-3 border border-1 border-gray-400 rounded-md outline-none my-2 text-xl hover:outline-gray-300"
            type="text"
            required
            ref={username}
            placeholder="Enter username"
          />

          <input
            className="p-3 border border-1 border-gray-400 rounded-md outline-none my-2 text-xl hover:outline-gray-300"
            type="email"
            required
            ref={email}
            placeholder="Email address or phone number"
          />

          <input
            className="p-3 border border-1 border-gray-400 rounded-md outline-none my-2 text-xl hover:outline-gray-300"
            type="password"
            required
            ref={password}
            minLength="6"
            placeholder="Password"
          />
          <input
            className="p-3 border border-1 border-gray-400 rounded-md outline-none my-2 text-xl hover:outline-gray-300"
            type="password"
            required
            ref={confirmPassword}
            minLength="6"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            disabled={isFetching}
            className="bg-blue-600 text-xl text-white font-bold my-2 rounded-md py-2 hover:bg-blue-500 disabled:cursor-not-allowed"
          >
            {isFetching ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              "Sign Up"
            )}
          </button>
          <button
            disabled={isFetching}
            onClick={() => {
              return navigate("/login");
            }}
            className="bg-green-600 text-xl text-white font-bold my-2 rounded-md py-2 hover:bg-green-500 disabled:cursor-not-allowed"
          >
            {isFetching ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              "Log into account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
