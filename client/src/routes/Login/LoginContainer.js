import React, { Component } from 'react';
import LoginPrenter from './LoginPresenter';
import { connect } from 'react-redux';
import { login } from '../../actions/userAction';
import { clearError } from '../../actions/errorAction';
import { message } from 'antd';

class LoginContainer extends Component {
	state = {
		username: '',
		password: '',
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { username, password } = this.state;
		const { login, clearError } = this.props;
		login(username, password);
		clearError();
	};

	render() {
		const { username, password } = this.state;
		return (
			<LoginPrenter
				username={username}
				password={password}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				err={this.props.err}
			/>
		);
	}

	componentDidUpdate(prevProps) {
		const { err, clearError } = this.props;
		if (err !== prevProps.err) {
			if (err === 402) {
				const info = () => {
					message.info('토큰이 만료되었습니다.');
				};
				info();
				clearError();
			}
		}
	}
}

const mapStateToProps = state => ({
	err: state.errorReducer.err,
});

export default connect(
	mapStateToProps,
	{ login, clearError }
)(LoginContainer);
