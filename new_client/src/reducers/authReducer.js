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
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: !!localStorage.getItem('token'),
	isLoading: null,
	userID: localStorage.getItem('userID') ? localStorage.getItem('userID') : '',
	username: localStorage.getItem('username')
		? localStorage.getItem('username')
		: '',
	newPassword: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case USER_LOADED:
			return {
				...state,
				isLoading: false,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			console.log(action.payload);
			if (action.payload.rememberme) {
				localStorage.setItem('token', action.payload.token);
				localStorage.setItem('userID', action.payload.userID);
				localStorage.setItem('username', action.payload.username);
			}
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case NEW_PASSWORD_SUCCESS:
			return {
				...state,
				newPassword: true,
				isAuthenticated: false,
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			localStorage.removeItem('token');
			localStorage.removeItem('userID');
			localStorage.removeItem('username');
			return {
				...state,
				token: null,
				userID: '',
				username: '',
				isAuthenticated: false,
				isLoading: false,
			};
		default:
			return state;
	}
}
