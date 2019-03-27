import React, { Component } from 'react';
import RegisterPresenter from './RegisterPresenter';
import { connect } from 'react-redux';
import { register } from '../../actions/userAction';

class RegisterContainer extends Component {
	state = {
		username: '',
		password: '',
		passwordConfirm: '',
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
		const { username, password, passwordConfirm } = this.state;
		const { register } = this.props;
		register(username, password, passwordConfirm);
	};

	componentDidUpdate(prevProps) {
		const { err, isAuthenticated } = this.props;
		// 에러 체크
		if (err !== prevProps.err) {
			if (err === '계정이 이미 존재합니다.') {
				this.setState({
					err: {
						type: 'username',
						msg: err,
					},
				});
			} else {
				this.setState({
					err: {
						type: 'password',
						msg: err,
					},
				});
			}
		}

		if (isAuthenticated !== prevProps.isAuthenticated) {
			this.setState({
				username: '',
				password: '',
				passwordConfirm: '',
				err: {
					type: '',
					msg: '',
				},
			});
		}
	}

	render() {
		const { username, password, passwordConfirm, err } = this.state;
		return (
			<RegisterPresenter
				username={username}
				password={password}
				passwordConfirm={passwordConfirm}
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
	{ register }
)(RegisterContainer);
