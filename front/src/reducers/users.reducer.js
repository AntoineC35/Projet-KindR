import {
  GET_PROS,
  GET_USERS,
  SEARCH_AROUND,
  GET_PROS_BY_DATE,
} from "../actions/users.action";

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case GET_PROS:
      return action.payload;
    case GET_PROS_BY_DATE:
      return action.payload;
    case SEARCH_AROUND:
      return action.payload;
    default:
      return state;
  }
}

export const selectPros = (state) => state.usersReducer.pros;
