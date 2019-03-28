import React, { Component } from 'react';
import LoginPrenter from './LoginPresenter';
import { connect } from 'react-redux';
import { login } from '../../actions/userAction';

class LoginContainer extends Component {
	state = {
		username: '',
		password: '',
		err: {
			type: '',
			msg: '',
		},
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { username, password } = this.state;
		const { login } = this.props;
		login(username, password);
	};

	componentDidUpdate(prevProps) {
		const { err, isAuthenticated } = this.props;
		// 에러 체크
		if (err !== prevProps.err) {
			if (err === '계정이 존재하지 않습니다.') {
				this.setState({
					err: {
						type: 'username',
						msg: err,
					},
				});
			} else if (err === '비밀번호가 일치하지 않습니다.') {
				this.setState({
					err: {
						type: 'password',
						msg: err,
					},
				});
			} else {
				this.setState({
					err: {
						type: '',
						msg: '',
					},
				});
			}
		}

		if (isAuthenticated !== prevProps.isAuthenticated) {
			this.setState({
				username: '',
				password: '',
				err: {
					type: '',
					msg: '',
				},
			});
		}
	}

	render() {
		const { username, password, err } = this.state;
		return (
			<LoginPrenter
				username={username}
				password={password}
				err={err}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

const mapStateToProps = state => ({
	err: state.userReducer.err,
	isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(
	mapStateToProps,
	{ login }
)(LoginContainer);
