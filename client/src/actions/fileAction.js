import axios from 'axios';

// 업로드
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';

export const upload = (formData) => dispatch => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	// API 요청
	axios
		.post('/api/files/upload', formData, config)
		// 업로드 성공
		.then(res =>
			dispatch({
				type: UPLOAD_SUCCESS,
				payload: res.data,
			})
		)
		// 업로드 실패
		.catch(err => {
			dispatch({
				type: UPLOAD_FAIL,
				payload: err.response.data,
			});
		});
};
