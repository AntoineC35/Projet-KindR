import axios from "axios";
import { apiUrl } from "../data/data";

export const CREATE_AVATAR = "CREATE_AVATAR";

export const createAvatar = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "create_avatar", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: CREATE_AVATAR, payload: res.data });
      });
  };
};
