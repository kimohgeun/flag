import React, { Component } from 'react';
import RegisterPresenter from './RegisterPresenter';
// 리덕스
import { connect } from 'react-redux';
import { register } from '../../actions/userAction';
import { clearError } from '../../actions/errorAction';

class RegisterContainer extends Component {
	state = {
		username: '',
		password: '',
		pwChecked: false,
		pwErr: false,
		loading: false,
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
		if (password.length === passwordConfirm.length) {
			if (password.match(passwordConfirm)) {
				this.setState({
					pwChecked: true,
					pwErr: false,
				});
			} else {
				this.setState({
					pwChecked: false,
					pwErr: true,
				});
			}
		} else {
			if (password.length < passwordConfirm.length) {
				this.setState({
					pwChecked: false,
					pwErr: true,
				});
			}
			if (password.length > passwordConfirm.length) {
				if (password.match(passwordConfirm)) {
					this.setState({
						pwChecked: false,
						pwErr: false,
					});
				} else {
					this.setState({
						pwChecked: false,
						pwErr: true,
					});
				}
			}
		}
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { username, password } = this.state;
		const { register, clearError } = this.props;
		register(username, password);
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
		const { username, password, pwChecked, pwErr, loading } = this.state;
		const { err } = this.props;
		return (
			<RegisterPresenter
				username={username}
				password={password}
				pwChecked={pwChecked}
				pwErr={pwErr}
				err={err}
				loading={loading}
				handlePasswordCheck={this.handlePasswordCheck}
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
	{ register, clearError }
)(RegisterContainer);
