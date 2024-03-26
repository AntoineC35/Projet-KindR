import axios from "axios";
import { apiUrl } from "../data/data";

export const CREATE_DISPONIBILITY_SLOT = "CREATE_DISPONIBILITY_SLOT";
export const DELETE_DISPONIBILITY_SLOT = "DELETE_DISPONIBILITY_SLOT";

export const createDisponibilitySlot = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "create_disponibility_slot", data)
      .then((res) => {
        dispatch({ type: CREATE_DISPONIBILITY_SLOT, payload: res.data });
      });
  };
};

export const deleteDisponibilitySlot = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "delete_disponibility_slot", data)
      .then((res) => {
        dispatch({ type: DELETE_DISPONIBILITY_SLOT, payload: res.data });
      });
  };
};
