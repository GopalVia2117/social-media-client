import axios from "axios";
import { SERVER_DOMAIN } from "./utils/pathService";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      `${SERVER_DOMAIN}/api/auth/login`,
      userCredentials
    );
    console.log(res.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  }
};
