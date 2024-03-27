import axios from "axios";
import { apiUrl } from "../data/data";

export const CREATE_ACTIVITE = "CREATE_ACTIVITE";

export const createActivite = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "create_activite", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: CREATE_ACTIVITE, payload: res.data });
      });
  };
};
