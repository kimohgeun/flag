import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/userAction';

// Initial State
const initialState = {
	token: localStorage.getItem('token'),
	user: null,
	isAuthenticated: false,
	err: null,
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
			localStorage.removeItem('flagToken');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				err: action.payload.msg,
			};
		default:
			return state;
	}
}
