import axios from 'axios';
import { getError } from './errorAction';

export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const GET_LIST = 'GET_LIST';
export const CLEAR_UPLOADED = 'CLEAR_UPLOADED';
export const DELETE_FILE = 'DELETE_FILE';

// 업로드
export const upload = formData => (dispatch, getState) => {
	// 토큰
	const token = getState().userReducer.token;
	// 헤더
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
			'x-auth-token': token,
		},
	};
	// API 요청
	axios.post('/api/files/upload', formData, config).then(res => {
		if (res.data.err) {
			// 업로드 실패
			dispatch(getError(res.data.err, 'UPLOAD_FAIL'));
			dispatch({
				type: UPLOAD_FAIL,
			});
		} else {
			// 업로드 성공
			dispatch({
				type: UPLOAD_SUCCESS,
				payload: res.data,
			});
		}
	});
};

// 클리어
export const clearUploaded = () => {
	return {
		type: CLEAR_UPLOADED,
	};
};

// 파일 리스트 가져오기
export const getFileList = username => (dispatch, getState) => {
	// 토큰
	const token = getState().userReducer.token;
	// 헤더
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};
	// API 요청
	axios.get(`/api/files/list/${username}`, config).then(res =>
		dispatch({
			type: GET_LIST,
			payload: res.data,
		})
	);
};

// 파일 삭제
export const deleteFile = (username, flagname) => (dispatch, getState) => {
	// 토큰
	const token = getState().userReducer.token;
	// 헤더
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};
	// API 요청
	axios.get(`/api/files/delete/${username}/${flagname}`, config).then(res =>
		dispatch({
			type: DELETE_FILE,
			payload: res.data,
		})
	);
};
