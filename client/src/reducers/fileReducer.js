import {
	GET_LIST,
	UPLOAD_SUCCESS,
	DELETE_SUCESS,
	CLEAR_UPLOADED,
	CLEAR_DELETED,
} from '../actions/fileAction';

// Initial State
const initialState = {
	fileList: [],
	loading: true,
	uploaded: false,
	deleted: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_LIST:
			return {
				...state,
				fileList: action.payload,
				loading: false,
			};
		case UPLOAD_SUCCESS:
			return {
				...state,
				fileList: action.payload,
				uploaded: true,
			};
		case DELETE_SUCESS:
			return {
				...state,
				fileList: state.fileList.filter(file => file.flag !== action.payload),
				deleted: true,
			};
		case CLEAR_UPLOADED:
			return {
				...state,
				uploaded: false,
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
