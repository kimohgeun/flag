import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
	return (
		<Container>
			<Text>
                4<i className="fas fa-cloud"></i>4
			</Text>
            <span>페이지를 찾을 수 없습니다.</span>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #1790ff;
    color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Text = styled.span`
	font-size: 5rem;
	font-weight: bold;
	color: #fff;
    letter-spacing: 10px;
`;

export default NotFound;
