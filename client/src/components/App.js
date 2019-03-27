import React, { Component } from 'react';
import GlobalStyle from '../GlobalStyle';
import 'antd/dist/antd.css';
import Router from './Router'



class App extends Component {
	render() {
		return (
			<>
				<GlobalStyle />
				<Router/>
			</>
		);
	}
}

export default App;
