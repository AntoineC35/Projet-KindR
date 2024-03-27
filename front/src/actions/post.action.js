import axios from "axios";
import { apiUrl } from "../data/data";

export const CREATE_POST = "CREATE_POST";
export const GET_POSTS = "GET_POSTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const CREATE_CATEGORY = "CREATE_CATEGORIES";

export const createPost = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "create_post", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: CREATE_POST, payload: res.data });
      });
  };
};

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(apiUrl + "get_posts", { withCredentials: true })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      });
  };
};

export const getCategories = () => {
  return (dispatch) => {
    return axios
      .get(apiUrl + "get_categories", { withCredentials: true })
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, payload: res.data });
      });
  };
};

export const createCategory = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "create_categories", { withCredentials: true })
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, payload: res.data });
      });
  };
};
