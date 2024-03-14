import {
  GET_CSRF_TOKEN,
  LOG_USER,
  LOG_OUT,
  CREATE_USER,
  UPDATE_USER,
} from "../actions/authUser.action";

const initialState = {
  csrf_token: null,
  data: null,
  connected: false,
};

const getLocalStorageData = () => {
  return {
    csrf_token: localStorage.getItem("csrf_token") || null,
    data: JSON.parse(localStorage.getItem("user")) || null,
    connected: localStorage.getItem("connected") === "true",
  };
};

export default function authUserReducer(
  state = getLocalStorageData() || initialState,
  action
) {
  switch (action.type) {
    case GET_CSRF_TOKEN:
      return { ...state, csrf_token: action.payload?.csrf_token || null };
    case LOG_USER:
      return { ...state, data: action.payload?.data || null, connected: true };
    case CREATE_USER:
      return {
        ...state,
        data: action.payload?.data || null,
        success: action.payload.success,
        connected: action.payload?.connected || false,
      };
    case UPDATE_USER:
      return { ...state, data: action.payload?.data || null };
    case LOG_OUT:
      localStorage.removeItem("user");
      localStorage.removeItem("connected");
      return initialState;
    default:
      return state;
  }
}

export const selectSuccess = (state) => state.authUserReducer.success;
export const selectCSRFToken = (state) => state.authUserReducer.csrf_token;
export const selectCurrentUser = (state) => state.authUserReducer.data;
export const selectIsLoggedIn = (state) => state.authUserReducer.connected;
