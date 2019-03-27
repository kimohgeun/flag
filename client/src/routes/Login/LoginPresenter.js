import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Icon, Input, Button } from 'antd';

// styled componets
const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #3d91f7;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div`
	width: 1024px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Logo = styled.h1`
	color: #fff;
	font-weight: bold;
	font-size: 30px;
	letter-spacing: 5px;
	padding: 30px;
`;

const LoginPresenter = ({ username, password, err, handleChange, handleSubmit }) => {
	return (
		<Container>
			<Box>
				<Logo>FLAG</Logo>
				<Form
					style={{
						width: '350px',
						background: '#fff',
						padding: '30px 20px',
						borderRadius: '5px',
					}}
					onSubmit={handleSubmit}
				>
					<Form.Item
						validateStatus={err.type === 'username' ? 'error' : ''}
						help={err.type === 'username' ? err.msg : ''}
					>
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							name="username"
							value={username}
							placeholder="Username"
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item
						validateStatus={err.type === 'password' ? 'error' : ''}
						help={err.type === 'password' ? err.msg : ''}
					>
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							disabled={username === '' || password === '' ? true : false}
						>
							Log in
						</Button>
					</Form.Item>
				</Form>
			</Box>
		</Container>
	);
};

// prop types check
LoginPresenter.prototypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	err: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default LoginPresenter;
