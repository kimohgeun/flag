import React from 'react';
import styled from 'styled-components';
import { Icon, Button, Card, Col, Row } from 'antd';

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

const Title = styled.span`
	display: inline-block;
	margin: 30px 0;
	font-weight: bold;
	background: #f5f5f5;
	padding: 5px 10px;
	border-radius: 5px;
`;

const UploadForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 50px;
`;

const UploadFormBox = styled.div`
	width: 50%;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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

const HomePresenter = ({
	flag,
	file,
	loading,
	username,
	logout,
	fileList,
	deleteFile,
	onChange,
	onSubmit,
	displayFileName,
}) => (
	<>
		<Top>
			<TopBox>
				<Logo>FLAG</Logo>
				<Logout onClick={() => logout()}>로그아웃</Logout>
			</TopBox>
		</Top>
		<Container>
			<Title>파일 업로드</Title>
			<UploadForm onSubmit={onSubmit} encType="multipart/form-data">
				<UploadFormBox>
					<FileInputLabel htmlFor="file_input">
						{loading ? (
							<>
								<Icon type="loading" style={{ fontSize: '5rem', padding: '5px' }} />
								<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>업로딩...</span>
							</>
						) : (
							<>
								<Icon type="cloud" style={{ fontSize: '5rem', padding: '5px' }} />
								<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>파일선택</span>
							</>
						)}
					</FileInputLabel>
					<FileName id="file_name" readOnly />
					<FileInput id="file_input" type="file" name="userfile" onChange={displayFileName} />
				</UploadFormBox>
				<UploadFormBox>
					<DownAddress>
						{`http://localhost:3000/${username}/`}
						<Flag
							placeholder="플래그명을 작성해 주세요."
							name="flagname"
							value={flag}
							onChange={onChange}
						/>
					</DownAddress>
					<Button type="primary" htmlType="submit" disabled={flag === '' || file === null}>
						업로드
					</Button>
				</UploadFormBox>
			</UploadForm>
			<Title>파일 리스트</Title>
			<div style={{ margin: '30px 0', padding: '30px' }}>
				<Row gutter={16}>
					{fileList.length !== 0 &&
						fileList.map(file => (
							<Col span={8} key={file._id}>
								<Card
									style={{ margin: '20px 0' }}
									title={file.filename}
									bordered={true}
									extra={
										<Icon
											type="delete"
											theme="filled"
											style={{ cursor: 'pointer' }}
											onClick={()=>deleteFile(username, file.flag)}
										/>
									}
								>
									<Icon
										type="flag"
										theme="filled"
										style={{ fontSize: '1.2rem', color: '#3d91f7', marginRight: '10px' }}
									/>
									{file.flag}
									<span style={{ float: 'right', color: '#3d91f7', cursor: 'pointer' }}>공유</span>
								</Card>
							</Col>
						))}
				</Row>
			</div>
		</Container>
	</>
);

export default HomePresenter;
