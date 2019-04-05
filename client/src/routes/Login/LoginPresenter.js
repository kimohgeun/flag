import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

const LoginPresenter = ({ username, password, handleChange, handleSubmit, err }) => {
	return (
		<Container>
			<Logo>
				<FlagIcon className="fas fa-flag" />
				FLAG
			</Logo>
			<LoginForm onSubmit={handleSubmit}>
				<FormItem
					validateStatus={err === '유저 없음' ? 'error' : ''}
					help={err === '유저 없음' ? '유저 네임이 존재하지 않습니다.' : ''}
				>
					<Input
						size="large"
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="text"
						placeholder="Username"
						name="username"
						value={username}
						onChange={handleChange}
					/>
				</FormItem>
				<FormItem
					validateStatus={err === '비밀번호 틀림' ? 'error' : ''}
					help={err === '비밀번호 틀림' ? '패스워드를 확인해주세요.' : ''}
				>
					<Input
						size="large"
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={handleChange}
					/>
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						htmlType="submit"
						size="large"
						block
						disabled={username === '' || password === ''}
					>
						로그인
					</Button>
				</FormItem>
			</LoginForm>
			<RegisterLink to="register">회원가입</RegisterLink>
		</Container>
	);
};

// styled
const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Logo = styled.h1`
	color: #1790ff;
	font-family: 'Baloo Chettan', cursive;
	font-size: 3rem;
	letter-spacing: 5px;
	margin-bottom: 30px;
`;

const FlagIcon = styled.i`
	font-size: 2.5rem;
`;

const LoginForm = styled(Form)`
	width: 300px;
`;

const FormItem = styled(Form.Item)`
	text-align: center;
`;

const RegisterLink = styled(Link)`
	font-size: 1.1rem;
	font-weight: bold;
`;

// types check
LoginPresenter.prototypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	err: PropTypes.number,
};

export default LoginPresenter;
