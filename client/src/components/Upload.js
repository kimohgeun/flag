import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { upload, clearUploaded } from '../actions/fileAction';
import { clearError } from '../actions/errorAction';
import { message } from 'antd';

class Upload extends Component {
	state = {
		flag: '',
		file: null,
		uploading: false,
	};

	displayFileName = e => {
		document.querySelector('#file_name').value = document.querySelector('#input_file').value;
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
			uploading: true,
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

	async componentDidUpdate(prevProps) {
		const { err, uploaded, clearError, clearUploaded } = this.props;
		// 에러 체크
		if (err !== prevProps.err) {
			if (err === '파일 중복') {
				const error = () => {
					message.error('이미 업로드된 파일명이 있습니다.');
				};
				await this.setState({
					uploading: false,
				});
				error();
				clearError();
			} else if (err === '플래그 중복') {
				const error = () => {
					message.error('이미 사용 중인 플래그입니다.');
				};
				await this.setState({
					uploading: false,
				});
				error();
				clearError();
			} else if (err === '업로드 실패') {
				const error = () => {
					message.error('업로드에 실패하였습니다.');
				};
				await this.setState({
					uploading: false,
				});
				error();
				clearError();
			}
		}

		// 업로드 체크
		if (uploaded !== prevProps.uploaded) {
			if (uploaded) {
				const success = () => {
					message.success('업로드에 성공하였습니다.');
				};
				success();
				await this.setState({
					flag: '',
					file: null,
					uploading: false,
				});
				document.querySelector('#file_name').value = null;
				document.querySelector('#input_file').value = null;
				clearUploaded();
			}
		}
	}

	render() {
		const { flag, uploading, file } = this.state;
		const { username } = this.props;
		return (
			<Container>
				<Form onSubmit={this.onSubmit}>
					{uploading === true ? (
						<LoadingIcon type="loading" />
					) : (
						<InputFileLabel htmlFor="input_file">
							<i className="fas fa-cloud-upload-alt" />
							<LabelText>파일선택</LabelText>
						</InputFileLabel>
					)}
					<InputFile id="input_file" type="file" onChange={this.displayFileName} />
					<FileName id="file_name" readOnly />
					<InputFlagBox>
						<FlagIcon className="fas fa-flag" />
						{`https://flag-kog.herokuapp.com/${username}/`}
						<InputFlag type="text" value={flag} onChange={this.onChange} />
					</InputFlagBox>
					<UploadButton display={flag !== '' && file !== null ? 'true' : 'false'}>
						업로드
					</UploadButton>
				</Form>
			</Container>
		);
	}
}

// 스타일 컴포넌트
const Container = styled.div`
	width: 100%;
	background: #1790ff;
	display: flex;
	justify-content: center;
`;

const Form = styled.form`
	width: 1024px;
	padding: 50px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const LoadingIcon = styled(Icon)`
	width: 140px;
	height: 140px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 5rem;
`;

const InputFileLabel = styled.label`
	font-size: 7rem;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	&:hover {
		transform: scale(1.1);
	}
	transition: transform 0.2s linear;
`;

const LabelText = styled.span`
	font-size: 1.2rem;
	font-weight: bold;
`;

const InputFile = styled.input`
	display: none;
`;

const FileName = styled.input`
	all: unset;
	text-align: center;
	margin: 15px 0;
	color: #fff;
	font-weight: bold;
	width: 100%;
`;

const InputFlagBox = styled.div`
	background: #fff;
	padding: 10px;
	display: flex;
	align-items: center;
	border-radius: 5px;
	font-weight: bold;
`;

const FlagIcon = styled.i`
	margin-right: 5px;
`;

const InputFlag = styled.input`
	all: unset;
	color: #1790ff;
`;

const UploadButton = styled.button`
	all: unset;
	margin-top: 20px;
	font-weight: bold;
	color: #fff;
	cursor: pointer;
	border: 2px solid #fff;
	padding: 5px 15px;
	border-radius: 5px;
	visibility: ${props => (props.display === 'true' ? 'visibility' : 'hidden')};
	opacity: ${props => (props.display === 'true' ? 1 : 0)};
	transition: opacity 1s linear;
`;

const mapStateToProps = state => ({
	username: state.userReducer.user.username,
	err: state.errorReducer.err,
	uploaded: state.fileReducer.uploaded,
});

export default connect(
	mapStateToProps,
	{ upload, clearUploaded, clearError }
)(Upload);
