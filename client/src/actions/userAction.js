import axios from 'axios';
import { getError } from './errorAction';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

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
	axios.post('/api/users/register', body, config).then(res => {
		if (res.data.err) {
			// 회원가입 실패
			dispatch(getError(res.data.err, 'REGISTER_FAIL'));
			dispatch({
				type: REGISTER_FAIL,
			});
		} else {
			// 회원가입 성공
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		}
	});
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
			if (res.data.err) {
				// 로그인 실패
				dispatch(getError(res.data.err, 'LOGIN_FAIL'));
				dispatch({
					type: LOGIN_FAIL,
				});
			} else {
				// 로그인 성공
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data,
				});
			}
		});
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
		axios.get('/api/users/user', config).then(res => {
			if (res.data.err) {
				// 로드 실패
				dispatch(getError(res.data.err, 'AUTH_FAIL'));
				dispatch({
					type: AUTH_FAIL,
				});
			} else {
				// 로드 성공
				dispatch({
					type: LOAD_SUCCESS,
					payload: res.data,
				});
			}
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
	axios.post(`/api/users/delete`, body, config).then(res => {
		if (res.data.err) {
			// 회원탈퇴 실패
			dispatch(getError(res.data.err, 'DELETE_USER_FAIL'));
			dispatch({
				type: DELETE_USER_FAIL,
			});
		} else {
			// 회원탈퇴 성공
			dispatch({
				type: DELETE_USER_SUCCESS,
				payload: res.data,
			});
		}
	});
};
