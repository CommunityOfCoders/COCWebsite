import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { REFRESH_TOKENS, LOGOUT_SUCCESS } from "../../actions/types";

const useAuthenticatedAxios = () => {
  const token = useSelector((state) => state.auth.token);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const userID = useSelector((state) => state.auth.userID);
  const dispatch = useDispatch();
  const history = useHistory();

  // Custom Axios Instace
  const axiosInstance = axios.create({
    baseURL: "",
    headers: { Authorization: `Bearer ${token}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    // Check if Access Token is expired
    const user = jwt_decode(token);
    const expiryDateAccessToken = new Date(user.exp * 1000);
    const isExpired = new Date() > expiryDateAccessToken;
    if (!isExpired) return req;

    // Check if Refresh Token is expired
    const refreshDecode = jwt_decode(refreshToken);
    const expiryDateRefreshToken = new Date(refreshDecode.exp * 1000);
    const isRefreshExpired = new Date() > expiryDateRefreshToken;
    if (isRefreshExpired) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      history.push("/signin");
      return Promise.reject();
    }

    // Update Refresh Tokens
    const response = await axios.post(
      `${process.env.REACT_APP_API}/refresh-tokens`,
      {
        refreshToken: refreshToken,
        uid: userID,
      }
    );

    // Dispatch to Refresh the new tokens in state and localStorage
    dispatch({
      type: REFRESH_TOKENS,
      payload: {
        token: response.data.token,
        refreshToken: response.data.refreshToken,
      },
    });

    req.headers.Authorization = `Bearer ${response.data.token}`;

    return req;
  });

  return axiosInstance;
};

export default useAuthenticatedAxios;
