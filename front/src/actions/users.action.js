import axios from "axios";
import { apiUrl } from "../data/data";

export const GET_USERS = "GET_USERS";
export const GET_PROS = "GET_PROS";
export const SEARCH_AROUND = "SEARCH_AROUND";
export const GET_PROS_BY_DATE = "GET_PROS_BY_DATE";
export const DELETE_USER = "DELETE_USER";
export const EDIT_PASSWORD = "EDIT_PASSWORD";
export const EDIT_USER = "EDIT_USER";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(apiUrl + "users", { withCredentials: true })
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      });
  };
};

export const getPros = () => {
  return (dispatch) => {
    return axios.get(apiUrl + "pros", { withCredentials: true }).then((res) => {
      dispatch({ type: GET_PROS, payload: res.data });
    });
  };
};

export const getProsByDate = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "get_pros_by_date", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: GET_PROS_BY_DATE, payload: res.data });
      });
  };
};

export const searchAround = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "search_around", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: SEARCH_AROUND, payload: res.data });
      });
  };
};

export const deleteUser = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "delete_user", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: res.data });
      });
  };
};

export const editPassword = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "edit_password", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: EDIT_PASSWORD, payload: res.data });
      });
  };
};

export const editUser = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "edit_user", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: EDIT_USER, payload: res.data });
      });
  };
};

export const filterPros = (query, pros) =>
  Object.values(pros).filter((pro) => pro.id.includes(query));
