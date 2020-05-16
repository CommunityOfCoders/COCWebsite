import { SET_LOADING, CLEAR_LOADING, SET_BLOG_POST } from "../actions/types";

const initialState = {
  isLoading: false,
  posts: [],
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_BLOG_POST:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
}
//export default function blogReducer(state = initialState, action) {
//switch (action.type) {
//case SET_LOADING:
//return {
//...state,
//isLoading: true,
//};
//case CLEAR_LOADING:
//return {
//...state,
//isLoading: false,
//};
//case SET_BLOG_POST:
//return {
//...state,
//posts: action.payload,
//};
//}
//}
