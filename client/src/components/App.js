import React, { Component } from 'react';
import GlobalStyle from '../GlobalStyle';
import 'antd/dist/antd.css';
import Router from './Router';
import { connect } from 'react-redux';
import { loadUser } from '../actions/userAction';

class App extends Component {
	componentDidMount() {
		this.props.loadUser();
	}
	render() {
		return (
			<>
				<GlobalStyle />
				<Router />
			</>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.userReducer.loading,
	isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(
	mapStateToProps,
	{ loadUser }
)(App);
