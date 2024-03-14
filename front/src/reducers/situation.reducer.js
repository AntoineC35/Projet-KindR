import { CREATE_SITUATION } from "../actions/situation.action";

const initialState = {};

export default function situationReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SITUATION:
      return action.payload;
    default:
      return state;
  }
}

export const selectSuccess = (state) => state.situationReducer.success;
