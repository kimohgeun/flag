import React, { Component } from 'react';
import LoginPrenter from './LoginPresenter';
// 리덕스
import { connect } from 'react-redux';
import { login } from '../../actions/userAction';
import { clearError } from '../../actions/errorAction';

class LoginContainer extends Component {
	state = {
		username: '',
		password: '',
		loading: false,
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { username, password } = this.state;
		const { login, clearError } = this.props;
		login(username, password);
		await clearError();
		this.setState({
			loading: true,
		});
	};

	componentDidMount() {
		const { clearError } = this.props;
		clearError();
	}

	componentDidUpdate(prevProps) {
		const { err } = this.props;
		if (err !== prevProps.err) {
			this.setState({
				loading: false,
			});
		}
	}

	render() {
		const { username, password, loading } = this.state;
		const { err } = this.props;
		return (
			<LoginPrenter
				username={username}
				password={password}
				err={err}
				loading={loading}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

const mapStateToProps = state => ({
	err: state.errorReducer.err,
});

export default connect(
	mapStateToProps,
	{ login, clearError }
)(LoginContainer);
