import React from 'react';
import styled, { keyframes } from 'styled-components';

const DownloadPresenter = ({ downloading, filename, err }) => (
	<Container>
		{downloading && (
			<Box>
				<Logo>
					<FlagIcon className="fas fa-flag" />
					FLAG
				</Logo>
				<Icon className="fas fa-cloud-download-alt" />
				<Text>{filename} 파일을 다운로드 합니다.</Text>
			</Box>
		)}
		{err && (
			<Box>
				<Logo>
					<FlagIcon className="fas fa-flag" />
					FLAG
				</Logo>
				<Icon className="fas fa-search" />
				<Text>유저 네임 혹은 플래그를 확인해 주세요.</Text>
			</Box>
		)}
	</Container>
);

// styled

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #3d91f7;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	animation: ${boxFade} 1s linear;
`;

const Logo = styled.h1`
	color: #fff;
	font-family: 'Baloo Chettan', cursive;
	font-size: 3rem;
	letter-spacing: 5px;
	margin-bottom: 10px;
`;

const FlagIcon = styled.i`
	font-size: 2.5rem;
`;

const Icon = styled.i`
	font-size: 10rem;
	color: #fff;
	margin-bottom: 20px;
`;

const Text = styled.span`
	font-weight: bold;
	color: #fff;
`;

export default DownloadPresenter;
