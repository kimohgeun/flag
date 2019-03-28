import React from 'react';
import styled from 'styled-components';
import { Icon, Button } from 'antd';

// styled componets
const Container = styled.div`
	width: 1024px;
	margin: 0 auto;
`;

const Top = styled.div`
	width: 100%;
	height: 50px;
	background: #3d91f7;
	display: flex;
	justify-content: center;
`;

const TopBox = styled.div`
	width: 1024px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const Logo = styled.span`
	color: #fff;
	font-weight: bold;
	font-size: 1.2rem;
	letter-spacing: 5px;
`;

const Logout = styled.span`
	color: #fff;
	font-weight: bold;
	cursor: pointer;
`;

const UploadForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
`;

const FileInputLabel = styled.label`
	width: 100%;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const LabelSpan = styled.span`
	font-weight: bold;
	color: #3d91f7;
	margin-top:10px;
	visibility: ${props => (props.disabled ? 'hidden' : 'visible')};
`;

const FileInput = styled.input`
	display: none;
`;

const FileName = styled.input`
	all: unset;
	width: 500px;
	text-align: center;
	color: #2ecc71;
	margin-bottom: 10px;
`;

const Address = styled.div`
	border: 2px solid #3d91f7;
	color: #3d91f7;
	padding: 10px;
	border-radius: 10px;
	margin-bottom: 20px;
`;

const Flag = styled.input`
	all: unset;
	color: #2ecc71;
`;

const HomePresenter = ({ username, disabled, flag, onChange, displayName, logout }) => (
	<>
		<Top>
			<TopBox>
				<Logo>FLAG</Logo>
				<Logout onClick={() => logout()}>로그아웃</Logout>
			</TopBox>
		</Top>
		<Container>
			<UploadForm>
				<div>
					<FileInputLabel for="file_input">
						<Icon style={{ fontSize: '5rem', color: '#3d91f7' }} type="cloud-upload" />
						<LabelSpan disabled={disabled}>파일선택을 선택해 주세요.</LabelSpan>
					</FileInputLabel>
					<FileInput id="file_input" type="file" onChange={displayName} />
					<FileName id="file_name" type="text" readOnly />
				</div>
				<Address>
					{`http://localhost:3000/${username}/`}
					<Flag placeholder="플래그명을 작성해 주세요." vlaue={flag} onChange={onChange} />
				</Address>
				<Button type="primary" htmlType="submit" disabled={!disabled || flag === ''}>
					업로드
				</Button>
			</UploadForm>
		</Container>
	</>
);

export default HomePresenter;
