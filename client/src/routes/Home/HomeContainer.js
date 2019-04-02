import React, { Component } from 'react';
import HomePresenter from './HomePresenter';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';
import { upload, clearUploaded, getFileList } from '../../actions/fileAction';
import { clearError } from '../../actions/errorAction';
import { message } from 'antd';

class HomeContainer extends Component {
	state = {
		flag: '',
		file: null,
		loading: false,
	};

	displayFileName = e => {
		document.querySelector('#file_name').value = document.querySelector('#file_input').value;
		this.setState({
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

	componentDidMount() {
		const { getFileList, username } = this.props;
		getFileList(username);
	}

	componentDidUpdate(prevProps) {
		const { uploaded, clearUploaded, err, clearError, getFileList, username } = this.props;
		if (uploaded !== prevProps.uploaded) {
			if (uploaded) {
				const success = () => {
					message.success('업로드를 완료하였습니다.');
				};
				success();
				this.setState({
					flag: '',
					file: null,
					loading: false,
				});
				document.querySelector('#file_name').value = null;
				document.querySelector('#file_input').value = null;
				clearUploaded();
				getFileList(username);
			}
		}
		if (err !== prevProps.err) {
			if (err === 400) {
				const error = () => {
					message.error('이미 사용된 플래그입니다.');
				};
				this.setState({
					loading: false,
				});
				error();
				clearError();
			} else if (err === 401) {
				const error = () => {
					message.error('업로드를 실패하였습니다.');
				};
				this.setState({
					loading: false,
				});
				error();
				clearError();
			}
		}
	}

	render() {
		const { flag, file, loading } = this.state;
		const { username, logout, fileList } = this.props;

		return (
			<HomePresenter
				flag={flag}
				file={file}
				loading={loading}
				username={username}
				logout={logout}
				fileList={fileList}
				onChange={this.onChange}
				onSubmit={this.onSubmit}
				displayFileName={this.displayFileName}
			/>
		);
	}
}

const mapStateToProps = state => ({
	username: state.userReducer.user.username,
	uploaded: state.fileReducer.uploaded,
	err: state.errorReducer.err,
	fileList: state.fileReducer.fileList,
});

export default connect(
	mapStateToProps,
	{ logout, upload, clearUploaded, clearError, getFileList }
)(HomeContainer);
