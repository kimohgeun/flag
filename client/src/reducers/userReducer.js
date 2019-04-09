import {
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOGOUT,
	LOAD_SUCCESS,
	AUTH_FAIL,
	DELETE_SUCCESS,
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
		case LOAD_SUCCESS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case AUTH_FAIL:
			localStorage.removeItem('flagToken');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				loading: false,
			};
		case LOGOUT:
		case DELETE_SUCCESS:
			localStorage.removeItem('flagToken');
			return {
				token: null,
				user: null,
				isAuthenticated: false,
				loading: false,
			};
		default:
			return state;
	}
}
