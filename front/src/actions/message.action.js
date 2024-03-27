import axios from "axios";
import { apiUrl } from "../data/data";

export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const GET_CONVERSATION = "GET_CONVERSATION";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const GET_MESSAGE = "GET_MESSAGE";
export const GET_ALL_CONVERSATIONS = "GET_ALL_CONVERSATIONS";
export const START_CONVERSATION = "START_CONVERSATION";

export const createConversation = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "create_conversation", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: CREATE_CONVERSATION, payload: res.data });
      });
  };
};

export const getConversation = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "get_conversation", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: GET_CONVERSATION, payload: res.data });
      });
  };
};

export const getAllConversations = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "get_all_conversations", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: GET_ALL_CONVERSATIONS, payload: res.data });
      });
  };
};

export const createMessage = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "create_message", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: CREATE_MESSAGE, payload: res.data });
      });
  };
};

export const getMessage = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "get_message/" + data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: GET_MESSAGE, payload: res.data });
      });
  };
};

export const startConversation = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "start_conversation", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: START_CONVERSATION, payload: res.data });
      });
  };
};
