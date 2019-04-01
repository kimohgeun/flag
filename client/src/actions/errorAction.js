// 에러 가져오기
export const GET_ERROR = 'GET_ERROR';

export const getError = (err, id = null) => {
	return {
		type: GET_ERROR,
		payload: { err, id },
	};
};

// 에러 지우기
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};
