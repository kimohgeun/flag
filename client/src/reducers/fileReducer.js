import { UPLOAD_SUCCESS, UPLOAD_FAIL } from '../actions/fileAction';

// Initial State
const initialState = {
	files: null,
	msg: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPLOAD_SUCCESS:
			return {
				...state,
				...action.payload,
			};
		case UPLOAD_FAIL:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
