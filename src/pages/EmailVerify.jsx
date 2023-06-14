import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/pathService";

function EmailVerify() {
  const [validURL, setValidURL] = useState(false);
  const param = useParams();
  useEffect(() => {
    const verifyEmailURL = async () => {
      try {
        if (!validURL) {
          const url = `${SERVER_DOMAIN}/api/users/${param.id}/verify/${param.token}`;
          const { data } = await axios.get(url);
          console.log(data);
          setValidURL(true);
        }
      } catch (error) {
        console.log(error);
        setValidURL(false);
      }
    };
    verifyEmailURL();
  }, []);

  return (
    <>
      {validURL ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <img className="w-60" src="/assets/OIP.jpg" alt="success" />
          <h1 className="text-3xl font-medium">Email Verified Successfully</h1>
          <Link to="/login">
            <button className="bg-green-500 text-white text-xl mt-4 font-medium px-2 py-1 rounded-lg">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen items-center justify-center">
          <h1>404 Not Found</h1>
        </div>
      )}
    </>
  );
}

export default EmailVerify;
