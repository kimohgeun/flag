import axios from 'axios';
import { getError } from './errorAction';

export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const CEAR_UPLOADED = 'CEAR_UPLOADED';
export const GET_LIST = 'GET_LIST';

// 업로드
export const upload = formData => dispatch => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
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

// 업로드 완료
export const clearUploaded = () => {
	return {
		type: CEAR_UPLOADED,
	};
};

// 파일 리스트 가져오기
export const getFileList = username => dispatch => {
	axios.get(`/api/files/list/${username}`).then(res =>
		dispatch({
			type: GET_LIST,
			payload: res.data,
		})
	);
};
