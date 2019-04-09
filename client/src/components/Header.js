import React, { Component } from 'react';
// 리덕스
import { connect } from 'react-redux';
import { logout, deleteUser } from '../actions/userAction';
import { clearError } from '../actions/errorAction';
// 스타일
import styled from 'styled-components';
import { Modal, Form, Input, Icon } from 'antd';
// 데이터 타입
import PropTypes from 'prop-types';

class Header extends Component {
	state = {
		menuVisible: false,
		deleteVisible: false,
		password: '',
		confirmLoading: false,
	};

	handleClick = type => {
		if (type === 'menuVisible') {
			this.setState({
				menuVisible: !this.state.menuVisible,
			});
		} else {
			this.setState({
				deleteVisible: !this.state.deleteVisible,
			});
		}
	};

	handleChange = e => {
		this.setState({
			password: e.target.value,
		});
	};

	handleCancel = () => {
		const { clearError } = this.props;
		this.setState({
			deleteVisible: false,
			menuVisible: false,
			password: '',
		});
		clearError();
	};

	handleOk = async () => {
		const { deleteUser, clearError } = this.props;
		const { password } = this.state;
		await clearError();
		deleteUser(password);
		this.setState({
			confirmLoading: true,
		});
	};

	componentDidUpdate(prevProps) {
		const { err } = this.props;
		if (err !== prevProps.err) {
			this.setState({
				confirmLoading: false,
			});
		}
	}

	render() {
		const { menuVisible, deleteVisible, password, confirmLoading } = this.state;
		const { logout, err } = this.props;
		return (
			<Container>
				<Box>
					<Logo>
						<FlagIcon className="fas fa-flag" />
						FLAG
					</Logo>
					<UserIcon
						id="header-menu"
						className="fas fa-user-circle"
						onClick={() => this.handleClick('menuVisible')}
					/>
					<MenuModal menuVisible={menuVisible} logout={logout} handleClick={this.handleClick} />
				</Box>
				<DeleteModal
					confirmLoading={confirmLoading}
					deleteVisible={deleteVisible}
					password={password}
					handleCancel={this.handleCancel}
					handleChange={this.handleChange}
					handleOk={this.handleOk}
					err={err}
				/>
			</Container>
		);
	}
}

const MenuModal = ({ menuVisible, logout, handleClick }) => (
	<Menu menuVisible={menuVisible === false ? 'false' : 'true'}>
		<MenuItem onClick={logout}>로그아웃</MenuItem>
		<MenuItem onClick={() => handleClick('deleteVisible')}>회원탈퇴</MenuItem>
	</Menu>
);

const DeleteModal = ({ confirmLoading, err, deleteVisible, password, handleChange, handleOk, handleCancel }) => (
	<Modal
		title="회원탈퇴"
		okText="탈퇴"
		cancelText="취소"
		confirmLoading={confirmLoading}
		onOk={handleOk}
		onCancel={handleCancel}
		visible={deleteVisible}
	>
		<Form>
			<p>패스워드를 입력하세요</p>
			<Form.Item
				validateStatus={err === '비밀번호 틀림' ? 'error' : ''}
				help={err === '비밀번호 틀림' ? '비밀번호가 일치하지 않습니다.' : ''}
			>
				<Input
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="password"
					value={password}
					placeholder="Password"
					onChange={handleChange}
				/>
			</Form.Item>
		</Form>
	</Modal>
);

// 스타일 컴포넌트
const Container = styled.div`
	width: 100%;
	background: #1790ff;
	display: flex;
	justify-content: center;
`;

const Box = styled.div`
	width: 1024px;
	height: 70px;
	display: flex;
	justify-content: space-between;
	position: relative;
`;

const Logo = styled.h1`
	color: #fff;
	font-family: 'Baloo Chettan', cursive;
	font-size: 2rem;
	letter-spacing: 5px;
	line-height: 70px;
`;

const FlagIcon = styled.i`
	font-size: 1.5rem;
`;

const UserIcon = styled.i`
	font-size: 2rem;
	color: #fff;
	line-height: 70px;
	cursor: pointer;
`;

const Menu = styled.div`
	position: absolute;
	right: 0;
	top: 60px;
	display: flex;
	flex-direction: column;
	background: #fff;
	padding: 10px;
	border-radius: 5px;
	display: ${props => (props.menuVisible === 'false' ? 'none' : 'flex')};
`;

const MenuItem = styled.span`
	font-weight: bold;
	margin: 10px;
	cursor: pointer;
	&:hover {
		color: #1790ff;
	}
	transition: color 0.2s linear;
`;

// 데이터 타입 검증
MenuModal.prototypes = {
	menuVisible: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
};

DeleteModal.prototypes = {
	confirmLoading: PropTypes.bool.isRequired,
	deleteVisible: PropTypes.bool.isRequired,
	password: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleOk: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	err: state.errorReducer.err,
});

export default connect(
	mapStateToProps,
	{ logout, deleteUser, clearError }
)(Header);
