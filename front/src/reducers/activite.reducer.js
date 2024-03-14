import { CREATE_ACTIVITE } from "../actions/activite.action";

const initialState = {};

export default function activiteReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ACTIVITE:
      return action.payload;
    default:
      return state;
  }
}

export const selectSuccess = (state) => state.activiteReducer.success;
