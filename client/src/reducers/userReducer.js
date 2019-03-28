import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOAD_SUCCESS,
	LOAD_FAIL,
} from '../actions/userAction';

// Initial State
const initialState = {
	token: localStorage.getItem('flagToken'),
	user: null,
	isAuthenticated: false,
	err: null,
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
				err: null,
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case LOAD_FAIL:
			localStorage.removeItem('flagToken');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				err: action.payload.msg,
				loading: false,
			};
		case LOAD_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
				loading: false,
			};
		case LOGOUT:
			localStorage.removeItem('flagToken');
		return {
			token: null,
			user: null,
			isAuthenticated: false,
			err: null,
			loading: false,
		}
		default:
			return state;
	}
}
