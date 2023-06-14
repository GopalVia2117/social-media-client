import React, { useRef, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/pathService";

function SendMail() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const email = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${SERVER_DOMAIN}/api/send-mail`;
      const { data } = await axios.post(url, { email: email.current.value });
      setError("");
      setMessage(data);
    } catch (error) {
      setMessage("");
      console.log(error);
      setError(error.response.data);
    }
  };
  return (
    <div className="min-h-screen flex flex-col w-full justify-center items-center gap-4">
      <div className="w-full p-4 lg:p-0 md:w-96 space-y-4">
        <h1 className="text-4xl font-semibold text-gray-500">
          Enter your Registered Email Address
        </h1>
        <div className="text-xl animate-pulse mt-4">
          {error && (
            <div className="w-full p-3 bg-red-500 text-white rounded-md">
              {error}
            </div>
          )}
          {message && (
            <div className="w-full p-3 bg-green-500 text-white rounded-md">
              {message}
            </div>
          )}
        </div>
        <form
          className="space-y-4"
          encType="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="w-full p-3 border border-solid text-xl border-gray-300 outline-none focus:outline-blue-300
          rounded-md"
            type="email"
            ref={email}
            required
            placeholder="Email Address"
          />
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-xl rounded-md text-white"
          >
            Send Mail
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendMail;
