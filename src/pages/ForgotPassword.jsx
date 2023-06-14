import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/pathService";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [validURL, setValidURL] = useState(false);
  const param = useParams();
  const newPass = useRef();
  const confirmPass = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  useEffect(() => {
    const verifyURL = async () => {
      try {
        const url = `${SERVER_DOMAIN}/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidURL(true);
      } catch (error) {
        console.log(error);
        setValidURL(false);
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (newPass.current.value === confirmPass.current.value) {
      try {
        const url = `${SERVER_DOMAIN}/api/users/${param.id}`;
        const { data } = await axios.put(url, {
          userId: param.id,
          password: newPass.current.value,
        });
        setError("");
        setMessage(data);
        setPasswordUpdated(true);
      } catch (error) {
        setMessage("");
        setError(error.response.data);
      }
    } else {
      setMessage("");
      setError("Passwords don't match");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {validURL ? (
        <div className="w-96">
          <h1 className="text-4xl font-medium">Change your Password</h1>
          <div className="px-4 py-2 animate-pulse mt-4">
            {error && (
              <div className="w-full p-2 bg-red-500 text-white text-xl rounded-md">
                {error}
              </div>
            )}
            {message && (
              <div className="w-full p-2 bg-green-500 text-white text-xl rounded-md">
                {message}
              </div>
            )}
          </div>
          {!passwordUpdated && (
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="flex flex-col bg-white p-4 rounded-md w-full relative shadow-sm"
            >
              <input
                className="p-3 border border-1 border-gray-400 rounded-md outline-none my-2 text-xl hover:outline-gray-300"
                type="password"
                ref={newPass}
                required
                placeholder="Enter new password"
              />

              <input
                className="p-3 border border-1 border-gray-400 rounded-md outline-none my-2 text-xl hover:outline-gray-300"
                type="password"
                ref={confirmPass}
                required
                placeholder="Confirm new password"
              />
              <button className="p-3 rounded-md my-2 text-sm bg-green-600 text-white text-xl">
                Update Password
              </button>
            </form>
          )}

          {passwordUpdated && (
            <button className="bg-green-500 text-white text-2xl p-3">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-gray-600">404</h1>
          <h2 className="text-4xl text-gray-600"> Page Not Found</h2>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
