const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const fs = require('fs')

const router = express.Router();

// 회원가입
router.post('/register', (req, res) => {
	const { username, password, passwordConfirm } = req.body;
	User.findOne({ username }).then(user => {
		// 중복가입 체크
		if (user) {
			return res.status(400).json({ msg: '계정이 이미 존재합니다.' });
		} else {
			// 비밀번호 체크
			if (password !== passwordConfirm) {
				return res.status(400).json({ msg: '비밀번호가 일치하지 않습니다.' });
			} else {
				// 새로운 계정 생성
				const newUser = new User({
					username,
					password,
				});
				// 비밀번호 암호화
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						// 업로드 폴더 생성
						fs.mkdirSync(`files/${newUser.username}`);
						// 데이터베이스 저장
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
			}
		}
	});
});

// 로그인
router.post('/login', (req, res) => {
	const { username, password } = req.body;

	User.findOne({ username }).then(user => {
		// 유저 확인
		if (!user) return res.status(400).json({ msg: '계정이 존재하지 않습니다.' });
		// 비밀번호 확인
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ msg: '비밀번호가 일치하지 않습니다.' });
			// 토큰 발급
			jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json({
					token,
					user: {
						id: user.id,
						name: user.name,
						email: user.email,
					},
				});
			});
		});
	});
});

// 유저정보 가져오기
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.json(user));
});

module.exports = router;