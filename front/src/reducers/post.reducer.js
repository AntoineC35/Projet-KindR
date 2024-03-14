import {
  CREATE_POST,
  GET_POSTS,
  GET_CATEGORIES,
  CREATE_CATEGORY,
} from "../actions/post.action";

const initialState = {
  posts: null,
  categories: null,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, newPost: action.payload ?? null };
    case GET_POSTS:
      return { ...state, posts: action.payload.posts ?? null };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload.categories ?? null };
    case CREATE_CATEGORY:
      return { ...state, newCategory: action.payload ?? null };
    default:
      return state;
  }
}

export const selectSuccess = (state) => state.postReducer.success;
export const selectCategories = (state) => state.postReducer.categories;
export const selectPosts = (state) => state.postReducer.posts;
