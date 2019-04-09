import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getFileList, deleteFile, clearDeleted } from '../actions/fileAction';
import { clearError } from '../actions/errorAction';
import { Col, Row, Modal, message } from 'antd';

class List extends Component {
	state = {
		visible: false,
		confirmLoading: false,
		flag: '',
	};

	// 클립보드
	clipboard = flag => {
		const { username } = this.props;
		let copyText = document.createElement('textarea');
		const address = `http://localhost:3000/${username}/${flag}`;
		document.body.appendChild(copyText);
		copyText.value = address;
		copyText.select();
		document.execCommand('copy');
		document.body.removeChild(copyText);
		const success = () => {
			message.success(`${address} 복사하였습니다.`);
		};
		success();
	};

	showDeleteModal = flag => {
		this.setState({
			visible: true,
			flag: flag,
		});
	};

	handleOk = () => {
		const { flag } = this.state;
		this.setState({
			confirmLoading: true,
		});
		const { deleteFile, username } = this.props;
		deleteFile(username, flag);
	};

	handleCancel = () => {
		this.setState({
			visible: false,
			flag: '',
		});
	};

	componentDidMount() {
		const { getFileList, username } = this.props;
		getFileList(username);
	}

	async componentDidUpdate(prevProps) {
		const { deleted, clearDeleted } = this.props;
		if (deleted !== prevProps.deleted) {
			await this.setState({
				visible: false,
				confirmLoading: false,
				flag: '',
			});
			clearDeleted();
		}
	}

	render() {
		const { fileList, loading } = this.props;
		const { visible, confirmLoading } = this.state;
		return (
			<Container>
				<FlagIcon className="fas fa-flag"> {!loading && fileList.length}개</FlagIcon>
				<Title>파일 리스트</Title>
				{loading ? (
					'loading...'
				) : (
					<Row gutter={16}>
						{fileList.length !== 0 && (
							<>
								{fileList.map(file => (
									<Col span={8} key={file._id}>
										<Card>
											<FlagIcon className="fas fa-flag"> {file.flag}</FlagIcon>
											<FileName>파일 : {file.filename}</FileName>
											<ButtonBox>
												<ClipboardButton
													className="fas fa-clipboard"
													onClick={() => this.clipboard(file.flag)}
												/>
												<DeleteButton
													className="fas fa-trash"
													onClick={() => this.showDeleteModal(file.flag)}
												/>
											</ButtonBox>
										</Card>
									</Col>
								))}
							</>
						)}
					</Row>
				)}
				<Modal
					visible={visible}
					onOk={this.handleOk}
					okText={'삭제'}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					cancelText={'취소'}
				>
					<ModalContent>
						<span style={{ fontWeight: 'bold' }}>파일을 삭제하시겠습니까?</span>
					</ModalContent>
				</Modal>
			</Container>
		);
	}
}

// styled
const Container = styled.div`
	width: 1024px;
	padding: 20px 0;
	display: flex;
	flex-direction: column;
`;

const Title = styled.span`
	flex: wrap;
	color: #1790ff;
	font-size: 1.2rem;
	font-weight: bold;
	padding: 10px 0;
`;

const Card = styled.div`
	height: 140px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border: 1px solid #e0e0e0;
	border-radius: 5px;
	padding: 15px;
	margin: 20px 0;
`;

const FlagIcon = styled.i`
	color: #1790ff;
	font-size: 1rem;
`;

const FileName = styled.span`
	font-weight: bold;
	margin: 10px 0;
`;

const ButtonBox = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 5px;
`;

const ClipboardButton = styled.i`
	font-size: 1.2rem;
	margin: 0 10px;
	cursor: pointer;
	&:hover {
		color: #2ecc71;
	}
	transition: color 0.2s linear;
`;

const DeleteButton = styled.i`
	font-size: 1.2rem;
	margin: 0 10px;
	cursor: pointer;
	&:hover {
		color: #e74c3c;
	}
	transition: color 0.2s linear;
`;

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
`;

const mapStateToProps = state => ({
	fileList: state.fileReducer.fileList,
	deleted: state.fileReducer.deleted,
	loading: state.fileReducer.loading,
	username: state.userReducer.user.username,
});

export default connect(
	mapStateToProps,
	{ clearError, getFileList, deleteFile, clearDeleted }
)(List);
