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