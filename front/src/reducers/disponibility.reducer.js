import {
  CREATE_DISPONIBILITY_SLOT,
  DELETE_DISPONIBILITY_SLOT,
} from "../actions/disponibility.action";

const initialState = {};

export default function disponibilityReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_DISPONIBILITY_SLOT:
      return action.payload;
    case DELETE_DISPONIBILITY_SLOT:
      return action.payload;
    default:
      return state;
  }
}

export const selectSuccess = (state) => state.disponibilityReducer.success;
