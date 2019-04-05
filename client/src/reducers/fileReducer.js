import { GET_LIST, UPLOAD_SUCCESS, UPLOAD_FAIL, CLEAR_UPLOADED, DELETE_FILE, CLEAR_DELETED } from '../actions/fileAction';

// Initial State
const initialState = {
	fileList: [],
	uploaded: false,
	deleted: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_LIST:
			return {
				...state,
				fileList: action.payload,
			};
		case UPLOAD_SUCCESS:
			return {
				...state,
				fileList: state.fileList.concat(action.payload),
				uploaded: true,
			};
		case UPLOAD_FAIL:
			return {
				...state,
			};
		case CLEAR_UPLOADED:
			return {
				...state,
				uploaded: false,
			};
		case DELETE_FILE:
			return {
				...state,
				fileList: state.fileList.filter(file => file.flag !== action.payload),
				deleted: true,
			};
		case CLEAR_DELETED:
			return {
				...state,
				deleted: false,
			};
		default:
			return state;
	}
}
