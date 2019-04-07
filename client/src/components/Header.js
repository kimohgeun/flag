import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/userAction';

class Header extends Component {
	state = {
		menuDisplay: false,
	};

	clickMenu = () => {
		this.setState({
			menuDisplay: !this.state.menuDisplay,
		});
	};

	render() {
		const { menuDisplay } = this.state;
		const { logout } = this.props;
		return (
			<Container>
				<Box>
					<Logo>
						<FlagIcon className="fas fa-flag" />
						FLAG
					</Logo>
					<UserIcon className="fas fa-user-circle" onClick={this.clickMenu} />
					<Menu display={menuDisplay === false ? 'false' : 'true'}>
						<MenuItem onClick={logout}>로그아웃</MenuItem>
						<MenuItem>회원탈퇴</MenuItem>
					</Menu>
				</Box>
			</Container>
		);
	}
}

// styled
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
	display: ${props => (props.display === 'false' ? 'none' : 'flex')};
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

export default connect(
	null,
	{ logout }
)(Header);
