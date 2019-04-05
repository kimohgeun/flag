import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Upload from '../../components/Upload';
import List from '../../components/List';

const Home = () => (
	<Container>
		<Header />
		<Upload />
		<List />
	</Container>
);

// styled
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default Home;
