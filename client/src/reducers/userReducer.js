import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOAD_SUCCESS,
	AUTH_FAIL,
	DELETE_USER_FAIL,
	DELETE_USER_SUCCESS,
} from '../actions/userAction';

// Initial State
const initialState = {
	token: localStorage.getItem('flagToken'),
	user: null,
	isAuthenticated: false,
	loading: true,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('flagToken', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case AUTH_FAIL:
			localStorage.removeItem('flagToken');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				loading: false,
			};
		case LOAD_SUCCESS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOGOUT:
		case DELETE_USER_SUCCESS:
			localStorage.removeItem('flagToken');
			return {
				token: null,
				user: null,
				isAuthenticated: false,
				loading: false,
			};
		case DELETE_USER_FAIL:
			return {
				...state,
			};
		default:
			return state;
	}
}
