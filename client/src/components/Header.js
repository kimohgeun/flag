import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Header = () => (
	<Container>
		<Box>
			<Logo>
				<FlagIcon className="fas fa-flag" />
				FLAG
			</Logo>
		</Box>
	</Container>
);

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

export default Header;
