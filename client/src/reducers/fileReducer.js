import { UPLOAD_SUCCESS, UPLOAD_FAIL, CEAR_UPLOADED } from '../actions/fileAction';

// Initial State
const initialState = {
	fileList: [],
	uploaded: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPLOAD_SUCCESS:
			return {
				...state,
				...action.payload,
			};
		case CEAR_UPLOADED:
			return {
				...state,
				uploaded: false,
			};
		case UPLOAD_FAIL:
			return {
				...state,
			};
		default:
			return state;
	}
}
