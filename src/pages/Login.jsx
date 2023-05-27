import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { loginCall } from "../loginCall";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const doSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
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
        <form
          onSubmit={doSubmit}
          className="flex flex-col bg-white p-4 rounded-md w-full relative shadow-sm"
        >
          <input
            className="p-3 border border-1 border-gray-400 rounded-md outline-none my-2 text-sm hover:outline-gray-300"
            type="email"
            required
            ref={email}
            placeholder="Email address or phone number"
          />

          <input
            className="p-3 border border-1 border-gray-400 rounded-md outline-none my-2 text-sm hover:outline-gray-300"
            type="password"
            required
            ref={password}
            minLength="5"
            placeholder="Password"
          />

          <button
            type="submit"
            disabled={isFetching}
            className="bg-blue-600 text-white font-bold my-2 rounded-md py-2 hover:bg-blue-500 disabled:cursor-not-allowed"
          >
            {isFetching ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              "Log In"
            )}
          </button>

          <hr className="bg-gray-400 my-3" />
          <a href="#" className="my-2 text-blue-600 hover:underline">
            Forgot Password?
          </a>
          <button
            type="button"
            disabled={isFetching}
            className="bg-green-500 text-white rounded-md p-2 my-2 w-48 mx-auto hover:bg-green-400 disabled:cursor-not-allowed"
          >
            {isFetching ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              "Create a New Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
