import {
  Room,
  Label,
  EmojiEmotions,
  PermMedia,
  Person,
  Cancel,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import BASE_DIR from "../utils/pathService";
import Loading from "./Loading";

function CreatePost() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now().toString() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      console.log(data.get("name"));
      newPost.img = fileName;

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
        await axios.post("/posts", newPost);
        setFile(null);
        desc.current.value = "";
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={submitHandler}
      className="shadow-md p-5 relative"
    >
      <div className="flex gap-4 items-center">
        {user.profilePicture ? (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={`${BASE_DIR}${user.profilePicture}`}
            alt=""
          />
        ) : (
          <span className="border border-white rounded-full p-2">
            <Person htmlColor="lightgray" />
          </span>
        )}
        <input
          className="flex-grow p-2 focus:outline-none"
          type="text"
          placeholder={`What's in your mind, ${user.username} ?`}
          ref={desc}
        />
      </div>
      <div>
        {/* {file ? <span>{file.name}</span> : ""} */}

        {file ? (
          <div className="relative">
            <img
              className="w-full object-contain max-h-[200px]"
              src={URL.createObjectURL(file)}
              alt=""
            />

            <button
              onClick={() => setFile(null)}
              className="absolute right-0 top-0 text-red-500"
            >
              <Cancel />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <hr className="mt-2" />

      <div className="flex flex-col items-center md:flex-row justify-between mt-4">
        <div className="flex justify-center space-x-2 md:justify-start">
          <label htmlFor="file" className="space-x-1">
            <PermMedia htmlColor="tomato" />
            <span className="font-medium">Choose Picture</span>
            <input
              className="hidden"
              type="file"
              id="file"
              name="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(file);
              }}
            />
          </label>

          {/* <button className="space-x-1">
            <Label htmlColor="blue" />
            <span className="font-medium">Tag</span>
          </button>

          <button className="space-x-1">
            <Room htmlColor="green" />
            <span className="font-medium">Location</span>
          </button>

          <button className="space-x-1">
            <EmojiEmotions htmlColor="goldenrod" />
            <span className="font-medium">Feelings</span>
          </button> */}
        </div>

        <div>
          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1 rounded-md mt-2"
          >
            Share
          </button>
        </div>
      </div>

      {loading && <Loading />}
    </form>
  );
}

export default CreatePost;
