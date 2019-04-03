import React, { Component } from 'react';
import HomePresenter from './HomePresenter';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';
import { upload, clearUploaded, getFileList, deleteFile } from '../../actions/fileAction';
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
		const { err, clearError, uploaded, clearUploaded } = this.props;
		// 업로드 체크
		if (uploaded) {
			if (uploaded !== prevProps.uploaded) {
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
			}
		}

		// 에러 체크
		if (err !== prevProps.err) {
			if(err === 400 ){
				const error = () => {
					message.error('이미 저장된 파일입니다.');
				};
				this.setState({
					loading: false,
				});
				error();
				clearError();
			}
			else if (err === 401) {
				const error = () => {
					message.error('이미 사용된 플래그입니다.');
				};
				this.setState({
					loading: false,
				});
				error();
				clearError();
			} else if (err === 402) {
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
		const { username, logout, fileList, deleteFile } = this.props;

		return (
			<HomePresenter
				flag={flag}
				file={file}
				loading={loading}
				username={username}
				logout={logout}
				fileList={fileList}
				deleteFile={deleteFile}
				onChange={this.onChange}
				onSubmit={this.onSubmit}
				displayFileName={this.displayFileName}
			/>
		);
	}
}

const mapStateToProps = state => ({
	username: state.userReducer.user.username,
	err: state.errorReducer.err,
	fileList: state.fileReducer.fileList,
	uploaded: state.fileReducer.uploaded,
});

export default connect(
	mapStateToProps,
	{ logout, upload, clearUploaded, clearError, getFileList, deleteFile }
)(HomeContainer);
