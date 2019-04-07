import React, { Component } from 'react';
import RegisterPresenter from './RegisterPresenter';
import { connect } from 'react-redux';
import { register } from '../../actions/userAction';
import { clearError } from '../../actions/errorAction';

class RegisterContainer extends Component {
	state = {
		username: '',
		password: '',
		pwChecked: false,
		pwErr: false,
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	// 비밀번호 확인 체크
	handlePasswordCheck = e => {
		const { password } = this.state;
		const passwordConfirm = document.querySelector('#passwordConfirm').value;
		if (password.match(passwordConfirm) && password.length === passwordConfirm.length) {
			this.setState({
				pwChecked: true,
				pwErr: false
			});
		} else if (password.length !== passwordConfirm.length) {
			this.setState({
				pwChecked: false,
			});
			 if (password.match(passwordConfirm) !== null) {
				this.setState({
					pwErr: false,
				});
			}
			if (password.length < passwordConfirm.length) {
				this.setState({
					pwErr: true,
				});
			}
		} else if (password.match(passwordConfirm) === null) {
			this.setState({
				pwErr: true,
			});
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		const { username, password } = this.state;
		const { register, clearError } = this.props;
		register(username, password);
		clearError();
	};

	componentDidMount() {
		const { clearError } = this.props;
		clearError();
	}

	render() {
		const { username, password, pwChecked, pwErr } = this.state;
		return (
			<RegisterPresenter
				username={username}
				password={password}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				err={this.props.err}
				handlePasswordCheck={this.handlePasswordCheck}
				pwChecked={pwChecked}
				pwErr={pwErr}
			/>
		);
	}
}

const mapStateToProps = state => ({
	err: state.errorReducer.err,
});

export default connect(
	mapStateToProps,
	{ register, clearError }
)(RegisterContainer);
