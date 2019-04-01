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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	margin-bottom: 10px;
	color: #3d91f7;
`;

const FileInput = styled.input`
	display: none;
`;

const FileName = styled.input`
	all: unset;
	width: 100%;
	text-align: center;
	font-size: 1rem;
	color: #2ecc71;
`;

const DownAddress = styled.div`
	border: 2px solid #3d91f7;
	color: #3d91f7;
	padding: 10px;
	border-radius: 10px;
	margin: 15px 0;
`;

const Flag = styled.input`
	all: unset;
	color: #2ecc71;
	font-weight: 500;
`;

const HomePresenter = ({ flag, file, loading, username, logout, onChange, onSubmit, displayFileName }) => (
	<>
		<Top>
			<TopBox>
				<Logo>FLAG</Logo>
				<Logout onClick={() => logout()}>로그아웃</Logout>
			</TopBox>
		</Top>
		<Container>
			<UploadForm onSubmit={onSubmit} encType="multipart/form-data">
				<FileInputLabel htmlFor="file_input">
					{loading ? (
						<>
							<Icon type="loading" style={{ fontSize: '5rem', padding: '5px' }} />
							<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>업로딩...</span>
						</>
					) : (
						<>
							<Icon type="file" style={{ fontSize: '5rem', padding: '5px' }} />
							<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>파일선택</span>
						</>
					)}
				</FileInputLabel>
				<FileName id="file_name" readOnly />
				<FileInput id="file_input" type="file" name="userfile" onChange={displayFileName} />
				<DownAddress>
					{`http://localhost:3000/${username}/`}
					<Flag placeholder="플래그명을 작성해 주세요." name="flagname" value={flag} onChange={onChange} />
				</DownAddress>
				<Button type="primary" htmlType="submit" disabled={flag === '' || file === null}>
					업로드
				</Button>
			</UploadForm>
		</Container>
	</>
);

export default HomePresenter;
