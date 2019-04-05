import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

const RegisterPresenter = ({ username, password, passwordConfirm, handleChange, handleSubmit, err }) => {
	return (
		<Container>
			<Title>
				<UserEditIcon className="fas fa-user-edit" />
				회원가입
			</Title>
			<RegisterForm onSubmit={handleSubmit}>
				<FormItem
					validateStatus={err === '중복가입' ? 'error' : ''}
					help={err === '중복가입' ? '이미 사용 중인 유저 네임입니다.' : ''}
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
				<FormItem>
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
					<Input
						size="large"
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						placeholder="Password Confirm"
						name="passwordConfirm"
						value={passwordConfirm}
						onChange={handleChange}
					/>
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						htmlType="submit"
						size="large"
						block
						disabled={username === '' || password === '' || passwordConfirm === ''}
					>
						회원가입
					</Button>
				</FormItem>
			</RegisterForm>
			<LoginLink to="/">로그인</LoginLink>
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

const Title = styled.h1`
	color: #1790ff;
	font-size: 2.5rem;
	font-weight: bold;
	letter-spacing: 5px;
	margin-bottom: 30px;
`;

const UserEditIcon = styled.i`
	font-size: 2.5rem;
`;

const RegisterForm = styled(Form)`
	width: 300px;
`;

const FormItem = styled(Form.Item)`
	text-align: center;
`;

const LoginLink = styled(Link)`
	font-size: 1.1rem;
	font-weight: bold;
`;

// prop types check
RegisterPresenter.prototypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	passwordConfirm: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	err: PropTypes.number,
};

export default RegisterPresenter;
