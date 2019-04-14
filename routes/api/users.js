const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const AWS = require('aws-sdk');

// 스키마
const User = require('../../models/User');
const File = require('../../models/File');

// AWS S3
const awsS3 = require('../../config/default.json').awsS3;
const s3 = new AWS.S3(awsS3);

// 회원가입
router.post('/register', (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username }).then(user => {
		// 중복가입 체크
		if (user) return res.status(400).json({ err: '중복가입' });
		// 계정 DB 생성
		const newUser = new User({
			username,
			password,
		});
		// 파일 DB 생성
		const newFile = new File({
			uploader: username,
			files: [],
		});
		// 비밀번호 암호화
		bcrypt.genSalt(10, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				// 데이터베이스 저장
				newFile.save().then(() =>
					newUser.save().then(user => {
						// 토큰 발급
						jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
							if (err) throw err;
							res.json({
								token,
								user: {
									id: user.id,
									username: user.username,
								},
							});
						});
					})
				);
			});
		});
	});
});

// 로그인
router.post('/login', (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username }).then(user => {
		// 유저 확인
		if (!user) return res.status(400).json({ err: '유저 없음' });
		// 비밀번호 확인
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ err: '비밀번호 틀림' });
			// 토큰 발급
			jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json({
					token,
					user: {
						id: user.id,
						username: user.username,
					},
				});
			});
		});
	});
});

// 유저정보 불러오기
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.json(user))
		.catch(err => res.status(400).json(err));
});

// 회원탈퇴
router.post('/delete', auth, (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username }).then(user => {
		// 비밀번호 확인
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ err: '비밀번호 틀림' });
			// aws 폴더 삭제
			let params = {
				Bucket: 'flag-ohgoodkim',
				Prefix: `${username}/`,
			};
			async function deleteFolder(params) {
				const listedObjects = await s3.listObjectsV2(params).promise();
				if (listedObjects.Contents.length === 0) {
					return;
				}
				const deleteParams = {
					Bucket: params.Bucket,
					Delete: { Objects: [] },
				};
				listedObjects.Contents.forEach(({ Key }) => {
					deleteParams.Delete.Objects.push({ Key });
				});
				await s3
					.deleteObjects(deleteParams)
					.promise()
					// DB 삭제
					.then(() => File.remove({ uploader: username }))
					.then(() => User.remove({ username: username }))
					.then(() => res.json({ msg: 'user delete' }));
				if (listedObjects.IsTruncated) {
					let obj = Object.assign({}, params, {
						ContinuationToken: listedObjects.NextContinuationToken,
					});
					await this.deleteFolder(obj);
				}
			}
			deleteFolder(params);
		});
	});
});

module.exports = router;
