import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL
} from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get(process.env.REACT_APP_API + "/user", tokenConfig(getState))
    .then(res => res.json())
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    })
}

export const register = ({ username, email, password, graduationYear }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, email, password, graduationYear });
  axios
    .post(process.env.REACT_APP_API + "/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, REGISTER_FAIL)
      );
      dispatch({
        type: REGISTER_FAIL
      })
    });

}

export const login = ({ username, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });

  axios
    .post(process.env.REACT_APP_API + "/login", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
      );
      dispatch({
        type: LOGIN_FAIL
      })
    });
}

export const newPassword = ({ newPassword, token }) => (dispatch) => {
  console.log(newPassword, token);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ newPassword, token });
  axios
    .post(process.env.REACT_APP_API + "/new-password", body, config)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: NEW_PASSWORD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, NEW_PASSWORD_FAIL)
      );
      dispatch({
        type: NEW_PASSWORD_FAIL
      })
    });

}

export const logout = () => (dispatch) => {
  console.log("Logout called");
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_SUCCESS
  });
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}
