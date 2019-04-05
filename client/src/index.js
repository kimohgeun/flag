import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// 리덕스 추가
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
// 리액트 라우터 돔
import { BrowserRouter } from 'react-router-dom';

// 리덕스 개발자 도구 추가
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		devTools
	)
);

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
