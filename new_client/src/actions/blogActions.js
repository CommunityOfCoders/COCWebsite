import axios from "axios";
import { SET_LOADING, SET_BLOG_POST, CLEAR_LOADING } from "./types";

export const getAllBlogs = () => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  try {
    let response = await axios.get(process.env.REACT_APP_API + "/blogs");
    dispatch({ type: SET_BLOG_POST, payload: response.data });
    dispatch({ type: CLEAR_LOADING, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};
