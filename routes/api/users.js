const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const fs = require('fs');
const router = express.Router();

// 스키마
const User = require('../../models/User');
const File = require('../../models/File');

// 회원가입
router.post('/register', (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username }).then(user => {
		// 중복가입 체크
		if (user) return res.json({ err: 403 });

		// 새로운 계정 생성
		const newUser = new User({
			username,
			password,
		});

		// 파일 목록
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
				// 업로드 폴더 생성
				fs.mkdirSync(`files/${newUser.username}`);
				// 데이터베이스 저장
				newFile.save();
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
				});
			});
		});
	});
});

// 로그인
router.post('/login', (req, res) => {
	const { username, password } = req.body;

	User.findOne({ username }).then(user => {
		// 유저 확인
		if (!user) return res.json({ err: 400 });
		// 비밀번호 확인
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) return res.json({ err: 401 });
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
		.then(user => res.json(user));
});

module.exports = router;
