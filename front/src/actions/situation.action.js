import axios from "axios";
import { apiUrl } from "../data/data";

export const CREATE_SITUATION = "CREATE_SITUATION";

export const createSituation = (data) => {
  return (dispatch) => {
    return axios.post(apiUrl + "create_situation", data).then((res) => {
      dispatch({ type: CREATE_SITUATION, payload: res.data });
    });
  };
};
