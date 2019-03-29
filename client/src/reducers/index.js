import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fileReducer from './fileReducer';

export default combineReducers({
	userReducer,
	fileReducer,
});
