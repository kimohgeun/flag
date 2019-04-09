import axios from 'axios';
import { getError } from './errorAction';

export const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGOUT = 'user/LOGOUT';
export const LOAD_SUCCESS = 'user/LOAD_SUCCESS';
export const AUTH_FAIL = 'user/AUTH_FAIL';
export const DELETE_SUCCESS = 'user/DELETE_SUCCESS';

// 회원가입
export const register = (username, password) => dispatch => {
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
		.post('/api/users/register', body, config)
		.then(res => {
			// 회원가입 성공
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		})
		// 회원가입 실패
		.catch(err => dispatch(getError(err.response.data.err, 'REGISTER_FAIL')));
};

// 로그인
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

		.then(res => {
			// 로그인 성공
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		})
		// 로그인 실패
		.catch(err => dispatch(getError(err.response.data.err, 'LOGIN_FAIL')));
};

// 로그아웃
export const logout = () => {
	return {
		type: LOGOUT,
	};
};

// 로드 유저
export const loadUser = () => (dispatch, getState) => {
	const token = getState().userReducer.token;
	// 토큰 없음
	if (token === null) {
		dispatch(getError('토큰 없음', 'AUTH_FAIL'));
		dispatch({
			type: AUTH_FAIL,
		});
	} else {
		// Headers
		const config = {
			headers: {
				'x-auth-token': token,
			},
		};
		axios
			.get('/api/users/user', config)
			.then(res => {
				// 로드 성공
				dispatch({
					type: LOAD_SUCCESS,
					payload: res.data,
				});
			})
			.catch(err => {
				dispatch(getError(err.response.data.err, 'AUTH_FAIL'));
				dispatch({
					type: AUTH_FAIL,
				});
			});
	}
};

// 회원 탈퇴
export const deleteUser = password => (dispatch, getState) => {
	// 토큰
	const token = getState().userReducer.token;
	const username = getState().userReducer.user.username;
	// 헤더
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};
	// body
	const body = {
		username: username,
		password: password,
	};
	// API 요청
	axios
		.post(`/api/users/delete`, body, config)
		.then(res => {
			// 회원탈퇴 성공
			dispatch({
				type: DELETE_SUCCESS,
				payload: res.data,
			});
		})
		// 회원탈퇴 실패
		.catch(err => dispatch(getError(err.response.data.err, 'DELETE_FAIL')));
};
