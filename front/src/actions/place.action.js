import axios from "axios";
import { apiUrl } from "../data/data";

export const CREATE_PLACE = "CREATE_PLACE";

export const createPlace = (data) => {
  return (dispatch) => {
    return axios.post(apiUrl + "create_place", data).then((res) => {
      dispatch({ type: CREATE_PLACE, payload: res.data });
    });
  };
};
