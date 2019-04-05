import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Router from './Router';
import { connect } from 'react-redux';
import { loadUser } from '../actions/userAction';

class App extends Component {
	componentDidMount() {
		const pathname = window.location.pathname;
		if (pathname === '/') {
			this.props.loadUser();
		}
	}
	render() {
		return (
			<>
				<Router />
			</>
		);
	}
}

export default connect(
	null,
	{ loadUser }
)(App);
