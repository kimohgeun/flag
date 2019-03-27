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
