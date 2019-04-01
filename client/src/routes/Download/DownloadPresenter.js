import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
// styled componets
const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction:column;
	justify-content: center;
	align-items: center;
	background: #3d91f7;
`;
const Title = styled.span`
	font-size: 4rem;
	font-weight: bold;
	color: #fff;
	letter-spacing: 5px;
`;

const SubTitle = styled.span`
	font-size: 2rem;
	font-weight: 200;
	color: #fff;
`;

const Box = styled.div`
	width: 1024px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
`;

const Text = styled.span`
	margin: 20px 10px;
`;

const DownloadPresenter = ({ downloading, err }) => (
	<Container>
		<Title>FLAG</Title>
		<SubTitle>File sharing using simple URL</SubTitle>
		<Box>
			{downloading && (
				<>
					<Icon
						type="flag"
						theme="filled"
						style={{ fontSize: '1.5rem', color: '#2ecc71' }}
					/>
					<Text>파일을 다운로드 중입니다.</Text>
				</>
			)}
			{err && (
				<>
					<Icon
						type="flag"
						theme="filled"
						style={{ fontSize: '1.5rem', color: '#e74c3c' }}
					/>
					<Text>유저네임 또는 플래그명을 확인해 주세요.</Text>
				</>
			)}
		</Box>
	</Container>
);

export default DownloadPresenter;
