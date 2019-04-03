import { UPLOAD_SUCCESS, UPLOAD_FAIL, GET_LIST, CLEAR_UPLOADED, DELETE_FILE } from '../actions/fileAction';

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
		case GET_LIST:
			return {
				...state,
				fileList: action.payload,
			};
		case DELETE_FILE:
			console.log(action.payload)
			return {
				...state,
				fileList: state.fileList.filter(file => file.flag !== action.payload),
			};
		default:
			return state;
	}
}
