// GET ERROR
export const GET_ERROR = 'GET_ERROR';

export const getError = (err, id = null) => {
	return {
		type: GET_ERROR,
		payload: { err, id },
	};
};

// CLEAR ERROR
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};
