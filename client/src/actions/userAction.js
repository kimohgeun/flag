import axios from 'axios';

// 로그인
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const login = (username, password) => dispatch => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// Body
	const body = JSON.stringify({ username, password });
	// API 요청
	axios
		.post('/api/users/login', body, config)
		// 로그인 성공
		.then(res =>
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			})
		)
		// 로그인 실패
		.catch(err => {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data,
			});
		});
};

// 로그아웃
export const LOGOUT = 'LOGOUT';

export const logout = () => {
	return {
		type: LOGOUT,
	};
};

// 회원가입
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const register = (username, password, passwordConfirm) => dispatch => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	// Body
	const body = JSON.stringify({ username, password, passwordConfirm });
	// API 요청
	axios
		.post('/api/users/register', body, config)
		// 회원가입 성공
		.then(res =>
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			})
		)
		// 회원가입 실패
		.catch(err => {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data,
			});
		});
};

// 유저정보 가져오기
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAIL = 'LOAD_FAIL';

export const loadUser = () => (dispatch, getState) => {
	// store에 있는 토큰 가져오기
	const token = getState().userReducer.token;
	// Headers
	// 토큰이 없을 경우
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};
	// 토큰이 있을 경우
	if (token) {
		config.headers['x-auth-token'] = token;
	}

	axios
		.get('/api/users/user', config)
		.then(res => {
			dispatch({
				type: LOAD_SUCCESS,
				payload: res.data,
			});
		})
		.catch(err => {
			dispatch({
				type: LOAD_FAIL,
				payload: err.response.data,
			});
		});
};
