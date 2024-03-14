import {
  CREATE_CONVERSATION,
  CREATE_MESSAGE,
  GET_CONVERSATION,
  GET_MESSAGE,
  GET_ALL_CONVERSATIONS,
  START_CONVERSATION,
} from "../actions/message.action";

const initialState = {
  messages: [],
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CONVERSATION:
      return action.payload;
    case GET_ALL_CONVERSATIONS:
      return action.payload;
    case CREATE_MESSAGE:
      return action.payload;
    case GET_CONVERSATION:
      return action.payload;
    case GET_MESSAGE:
      return action.payload;
    case START_CONVERSATION:
      return action.payload;
    default:
      return state;
  }
}

export const selectSuccess = (state) => state.messageReducer.success;
export const selectConversations = (state) =>
  state.messageReducer.conversations;
export const selectedConversation = (state) =>
  state.messageReducer.conversation;
