import { combineReducers } from "redux";
import authUserReducer from "./authUser.reducer";
import usersReducer from "./users.reducer";
import addressReducer from "./address.reducer";
import placeReducer from "./place.reducer";
import activiteReducer from "./activite.reducer";
import situationReducer from "./situation.reducer";
import messageReducer from "./message.reducer";
import disponibilityReducer from "./disponibility.reducer";
import avatarReducer from "./avatar.reducer";
import postReducer from "./post.reducer";

export default combineReducers({
  authUserReducer,
  usersReducer,
  addressReducer,
  placeReducer,
  activiteReducer,
  situationReducer,
  messageReducer,
  disponibilityReducer,
  avatarReducer,
  postReducer,
  // REDUCERS
});
