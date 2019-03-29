import React, { Component } from 'react';
import HomePresenter from './HomePresenter';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';
import { upload } from '../../actions/fileAction';
import { message } from 'antd';

class HomeContainer extends Component {
	state = {
		disabled: false,
		file: null,
		flag: '',
		loading: false,
	};

	displayName = e => {
		document.querySelector('#file_name').value = document.querySelector('#file_input').value;
		this.setState({
			disabled: true,
			file: e.target.files[0],
		});
	};

	onChange = e => {
		this.setState({
			flag: e.target.value,
		});
	};

	onSubmit = e => {
		e.preventDefault();
		this.setState({
			loading: true,
		});
		const { flag, file } = this.state;
		const { upload, username } = this.props;
		const flagname = flag;
		const userfile = file;

		const formData = new FormData();
		formData.append('username', username);
		formData.append('flagname', flagname);
		formData.append('userfile', userfile);

		upload(formData);
	};

	error = () => {
		const { msg } = this.props;
		message.error(msg);
	};

	success = () => {
		const { msg } = this.props;
		message.success(msg);
	};

	componentDidUpdate(prevProps) {
		const { msg } = this.props;

		if (msg !== prevProps.msg) {
			if (msg === '이미 사용된 플래그명 입니다.') {
				this.error();
				this.setState({
					loading: false,
				});
			} else if (msg === '업로드 실패') {
				this.error();
				this.setState({
					loading: false,
				});
			} else {
				this.success();
				this.setState({
					disabled: false,
					file: null,
					flag: '',
					loading: false,
				});
				document.querySelector('#file_name').value = null
			}
		}
	}

	render() {
		const { disabled, flag, loading } = this.state;
		const { logout, username } = this.props;
		
		return (
			<HomePresenter
				disabled={disabled}
				username={username}
				flag={flag}
				logout={logout}
				loading={loading}
				onChange={this.onChange}
				onSubmit={this.onSubmit}
				displayName={this.displayName}
			/>
		);
	}
}

const mapStateToProps = state => ({
	username: state.userReducer.user.username,
	msg: state.fileReducer.msg,
});

export default connect(
	mapStateToProps,
	{ logout, upload }
)(HomeContainer);
