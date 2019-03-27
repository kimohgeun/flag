import React, { Component } from 'react';
import GlobalStyle from '../GlobalStyle';
import 'antd/dist/antd.css';
import Login from '../routes/Login';

class App extends Component {
	render() {
		return (
			<div>
				<GlobalStyle />
				<Login />
			</div>
		);
	}
}

export default App;
