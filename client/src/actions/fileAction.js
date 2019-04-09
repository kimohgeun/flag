import axios from 'axios';
import { getError } from './errorAction';

export const GET_LIST = 'file/GET_LIST';
export const UPLOAD_SUCCESS = 'file/UPLOAD_SUCCESS';
export const DELETE_SUCESS = 'file/DELETE_FILE_SUCESS';
export const CLEAR_UPLOADED = 'file/CLEAR_UPLOADED';
export const CLEAR_DELETED = 'file/CLEAR_DELETED';

// GET
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
	axios
		.get(`/api/files/list/${username}`, config)
		.then(res =>
			dispatch({
				type: GET_LIST,
				payload: res.data,
			})
		)
		.catch(err => dispatch(getError(err.response.data.err, 'GET_LIST_FAIL')));
};

// UPLOAD
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
	axios
		.post('/api/files/upload', formData, config)
		.then(res => {
			// 업로드 성공
			dispatch({
				type: UPLOAD_SUCCESS,
				payload: res.data,
			});
		})
		// 업로드 실패
		.catch(err => dispatch(getError(err.response.data.err, 'UPLOAD_FAIL')));
};

// DELETE
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
	axios
		.get(`/api/files/delete/${username}/${flagname}`, config)
		.then(res => {
			// 삭제 성공
			dispatch({
				type: DELETE_SUCESS,
				payload: res.data,
			});
		})
		// 삭제 실패
		.catch(err => dispatch(getError(err.response.data.err, 'DELETE_FAIL')));
};

// CLEAR
export const clearUploaded = () => {
	return {
		type: CLEAR_UPLOADED,
	};
};

export const clearDeleted = () => {
	return {
		type: CLEAR_DELETED,
	};
};
