import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

const Title = styled.span`
	color: #fff;
	font-weight: bold;
	font-size: 30px;
	letter-spacing: 5px;
`;

const SubTitle = styled.span`
	color: #fff;
	font-size:1.3rem;
	font-weight: 200;
	margin-bottom: 50px;
`;

const Text = styled.span`
	display: block;
	text-align: center;
	font-size: 1.5rem;
	color: #3d91f7;
	font-weight:bold;
	margin-bottom: 20px;
`;

const Register = styled(Link)`
	float: right;
	margin-top: 10px;
`;

const LoginPresenter = ({ username, password, handleChange, handleSubmit, err }) => {
	return (
		<Container>
			<Box>
				<Title>FLAG</Title>
				<SubTitle>File sharing using simple URL</SubTitle>
				<Form
					style={{
						width: '350px',
						background: '#fff',
						padding: '30px 20px',
						borderRadius: '5px',
					}}
					onSubmit={handleSubmit}
				>
					<Text>로그인</Text>
					<Form.Item
						validateStatus={err === 400 ? 'error' : ''}
						help={err === 400 && '계정이 존재하지 않습니다.'}
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
						validateStatus={err === 401 ? 'error' : ''}
						help={err === 401 && '비밀번호가 일치하지 않습니다.'}
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
							로그인
						</Button>
					</Form.Item>
					<Register to="/register">회원가입</Register>
				</Form>
			</Box>
		</Container>
	);
};

// prop types check
LoginPresenter.prototypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	err: PropTypes.number,
};

export default LoginPresenter;
