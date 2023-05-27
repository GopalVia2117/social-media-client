import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import BASE_DIR from "../utils/pathService";
import { Person, Photo } from "@mui/icons-material";
import { ArrowRight } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { user } = useContext(AuthContext);
  const profileImage = user.profilePicture;
  const coverImage = user.coverPicture;
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [relation, setRelation] = useState(1);

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedFields = {
      userId: user._id,
    };

    const file = profileFile || coverFile;
    console.log(file);

    if (file) {
      const data = new FormData();
      const fileName = Date.now().toString() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      console.log(data.get("name"));
      {
        profileFile
          ? (updatedFields.profilePicture = fileName)
          : (updatedFields.coverPicture = fileName);
      }

      console.log(updatedFields);
      const config = () => {
        data.encType = "multipart/form-data";
      };

      try {
        setLoading(true);
        await axios.post("/upload", data, config);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }

      try {
        await axios.put(`/users/${user._id}`, updatedFields);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }

      const previousUserCredentials = JSON.parse(localStorage.getItem("user"));
      const updatedUserCredentials = {
        ...previousUserCredentials,
        ...updatedFields,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserCredentials));
      window.location.reload();
    } else {
      if (city) {
        updatedFields.city = city;
      }
      if (town) {
        updatedFields.from = town;
      }

      if (relation) {
        updatedFields.relationship = relation;
      }

      try {
        setLoading(true);
        await axios.put(`/users/${user._id}`, updatedFields);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
      const previousUserCredentials = JSON.parse(localStorage.getItem("user"));
      const updatedUserCredentials = {
        ...previousUserCredentials,
        ...updatedFields,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserCredentials));
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar />
      <h2 className="text-3xl pl-12 text-gray-600 mt-4">
        <ArrowRight /> Edit Profile
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center items-center space-y-3 mt-2 p-4 shadow-md"
        >
          {!profileFile && profileImage ? (
            <img
              className="relative w-32 h-32 rounded-full object-cover mx-auto  border-2 border-white"
              src={`${BASE_DIR}${profileImage}`}
              alt=""
            />
          ) : (
            ""
          )}
          {!profileFile && !profileImage ? (
            <span className="relative flex  justify-center items-center w-32 h-32 object-cover mx-auto  border-2 border-white text-[128px] rounded-full p-2">
              <Person htmlColor="lightgray" fontSize="inherit" />
            </span>
          ) : (
            ""
          )}
          {profileFile ? (
            <img
              className="relative w-32 h-32 rounded-full object-cover mx-auto  border-2 border-white"
              src={URL.createObjectURL(profileFile)}
              alt=""
            />
          ) : (
            ""
          )}
          {!profileFile ? (
            <label
              htmlFor="profilePicture"
              className="cursor-pointer p-2 rounded-md border  border-blue-400"
            >
              <span className="text-blue-700">
                <Photo />
              </span>
              Change Profile Picture
            </label>
          ) : (
            ""
          )}
          <input
            className="hidden"
            id="profilePicture"
            type="file"
            name="file"
            onChange={(e) => {
              setProfileFile(e.target.files[0]);
            }}
          />
          {profileFile ? (
            <button
              type="submit"
              className="bg-blue-600 px-2 py-1 rounded-md text-white"
            >
              Update Picture
            </button>
          ) : (
            ""
          )}
        </form>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center items-center space-y-4 mt-2 shadow-md"
        >
          {!coverFile && coverImage ? (
            <img
              className="max-w-[240px] object-cover mx-auto mt-2"
              src={`${BASE_DIR}${coverImage}`}
              alt=""
            />
          ) : (
            ""
          )}
          {!coverFile && !coverImage ? (
            <span className="relative flex  justify-center items-center w-32 h-32 object-cover mx-auto border-2 border-white text-[128px] rounded-full p-2">
              <Person htmlColor="lightgray" fontSize="inherit" />
            </span>
          ) : (
            ""
          )}
          {coverFile ? (
            <img
              className="max-w-[240px] object-cover mx-auto mt-2"
              src={URL.createObjectURL(coverFile)}
              alt=""
            />
          ) : (
            ""
          )}
          {!coverFile ? (
            <label
              htmlFor="coverPicture"
              className="cursor-pointer p-2 rounded-md border mt-2  border-blue-400"
            >
              <span className="text-blue-700">
                <Photo />
              </span>
              Change Cover Picture
            </label>
          ) : (
            ""
          )}
          <input
            className="hidden"
            id="coverPicture"
            type="file"
            name="file"
            onChange={(e) => {
              setCoverFile(e.target.files[0]);
            }}
          />
          {coverFile ? (
            <button
              type="submit"
              className="bg-blue-600 px-2 py-1 rounded-md mt-2 text-white"
            >
              Update Picture
            </button>
          ) : (
            ""
          )}
        </form>
        <form
          onSubmit={submitHandler}
          className="flex flex-col py-3 shadow-md gap-4 p-2"
        >
          <input
            className="border border-gray-300 p-2 rounded-md outline-none hover:border-gray-500 focus:border-gray-500"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Update City"
          />
          <input
            className="border border-gray-300 p-2 rounded-md outline-none hover:border-gray-500 focus:border-gray-500"
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            placeholder="Update Town"
          />
          <select
            className="border border-gray-300 p-2 rounded-md outline-none hover:border-gray-500 focus:border-gray-500"
            name="relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
          >
            <option value="1">Single</option>
            <option value="2">Married</option>
            <option value="3">Complex</option>
          </select>

          <button
            className="bg-blue-600 text-white p-2 rounded-md self-center"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>

      {loading && <Loading />}
    </>
  );
}

export default EditProfile;
