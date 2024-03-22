import axios from "axios";
import { apiUrl } from "../data/data";

export const GET_CSRF_TOKEN = "GET_CSRF_TOKEN";
export const LOG_USER = "LOG_USER";
export const LOG_OUT = "LOG_OUT";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getCSRFToken = () => {
  return (dispatch) => {
    return axios.get(apiUrl + "CSRFToken").then((res) => {
      dispatch({
        type: GET_CSRF_TOKEN,
        payload: res.data.data.session_user,
      });
    });
  };
};

export const loginUser = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "sign_in", data)
      .then((res) => {
        console.log(res);
        const payload = res.data;

        if (payload.connected) {
          dispatch({ type: LOG_USER, payload });
          saveUserToLocalStorage(payload.data);
          localStorage.setItem("connected", true);
        } else {
          console.error("Login failed:", payload.message);

          throw new Error(payload.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);

        throw error;
      });
  };
};

export const createUser = (data) => {
  return (dispatch) => {
    return axios.post(apiUrl + "create_user", data).then((res) => {
      dispatch({ type: CREATE_USER, payload: res.data });
      saveUserToLocalStorage(res.data.data);
      localStorage.setItem("connected", true);
    });
  };
};

export const updateUser = (data) => {
  return (dispatch) => {
    return axios.get(apiUrl + "update_user/" + data).then((res) => {
      dispatch({ type: UPDATE_USER, payload: res.data });
      saveUserToLocalStorage(res.data.data);
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return axios.get(apiUrl + "logout").then((res) => {
      dispatch({ type: LOG_OUT, payload: res.data });
    });
  };
};

const saveUserToLocalStorage = (userData) => {
  const existingUserData = JSON.parse(localStorage.getItem("user")) || {};
  const mergedUserData = { ...existingUserData, ...userData };
  localStorage.setItem("user", JSON.stringify(mergedUserData));
};
