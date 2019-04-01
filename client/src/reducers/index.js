import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fileReducer from './fileReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	userReducer,
	fileReducer,
	errorReducer,
});
