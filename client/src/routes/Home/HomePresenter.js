import React from 'react';

const HomePresenter = ({ logout }) => (
	<>
		<button onClick={() => logout()}>로그아웃</button>
	</>
);

export default HomePresenter;
