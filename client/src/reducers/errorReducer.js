import { GET_ERROR, CLEAR_ERROR } from '../actions/errorAction';

// Initial State
const initialState = {
	err: null,
	id: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ERROR:
			return {
				...action.payload,
			};
		case CLEAR_ERROR:
			return {
				err: null,
				id: null,
			};
		default:
			return state;
	}
}
