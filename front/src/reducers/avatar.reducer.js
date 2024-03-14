import { CREATE_AVATAR } from "../actions/avatar.action";

const initialState = {};

export default function avatarReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_AVATAR:
      return action.payload;
    default:
      return state;
  }
}

export const selectSuccess = (state) => state.placeReducer.success;
