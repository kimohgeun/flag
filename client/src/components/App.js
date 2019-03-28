import React, { Component } from 'react';
import GlobalStyle from '../GlobalStyle';
import 'antd/dist/antd.css';
import Router from './Router';
import { connect } from 'react-redux';
import { loadUser } from '../actions/userAction';
import { message } from 'antd';

class App extends Component {
	info = () => {
		const { err } = this.props;
		message.info(err);
	};

	componentDidMount() {
		this.props.loadUser();
	}

	componentDidUpdate(prevProps) {
		const { err } = this.props;

		if (err !== prevProps.err) {
			if (err === '토큰이 만료되었습니다.') {
				this.info();
			}
		}
	}

	render() {
		const { isAuthenticated, loading } = this.props;
		return (
			<>
				<GlobalStyle />
				<Router loading={loading} isAuthenticated={isAuthenticated} />
			</>
		);
	}
}

const mapStateToProps = state => ({
	err: state.userReducer.err,
	isAuthenticated: state.userReducer.isAuthenticated,
	loading: state.userReducer.loading,
});

export default connect(
	mapStateToProps,
	{ loadUser }
)(App);
