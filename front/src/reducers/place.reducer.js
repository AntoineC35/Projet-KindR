import { CREATE_PLACE } from "../actions/place.action";

const initialState = {};

export default function placeReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLACE:
      return action.payload;
    default:
      return state;
  }
}

export const selectSuccess = (state) => state.placeReducer.success;
