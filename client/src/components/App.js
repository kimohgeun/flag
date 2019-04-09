import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Router from './Router';
import { connect } from 'react-redux';
import { loadUser, logout } from '../actions/userAction';
import { message } from 'antd';

class App extends Component {
	componentDidMount() {
		const pathname = window.location.pathname;
		if (pathname === '/' || pathname === '/register' || pathname === '/login') {
			this.props.loadUser();
		}
	}

	componentDidUpdate(prevProps) {
		const { err, logout } = this.props;
		if (err !== prevProps.err) {
			if (err === '토큰 만료') {
				logout();
				const info = () => {
					message.info('토큰이 만료되었습니다.');
				};
				info();
			}
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

const mapStateToProps = state => ({
	err: state.errorReducer.err,
});

export default connect(
	mapStateToProps,
	{ loadUser, logout }
)(App);
