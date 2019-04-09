import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// 리덕스 추가
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
