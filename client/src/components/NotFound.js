import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
	return (
		<Container>
			<Title>
                4<i className="fas fa-cloud"></i>4
			</Title>
            <Text>페이지를 찾을 수 없습니다.</Text>
		</Container>
	);
};

// 스타일 컴포넌트
const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #1790ff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-weight: bold;
`;

const Title = styled.span`
	font-size: 5rem;
    letter-spacing: 10px;
`;

const Text = styled.span`
	font-size: 1.3rem;
`;

export default NotFound;
