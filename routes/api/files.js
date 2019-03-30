const express = require('express');
const config = require('config');
const auth = require('../../middleware/auth');
const File = require('../../models/File');

const router = express.Router();

// 업로드
router.post('/upload', (req, res) => {
	const { username, flagname } = req.body;
	const { userfile } = req.files;
	File.findOne({ uploader: username }).then(uploader => {
		if (uploader) {
			// 플래그 중복확인
			File.findOne({
				flag: flagname,
			}).then(flag => {
				if (flag)
					return res.status(400).json({
						msg: '이미 사용된 플래그명 입니다.',
					});
				const newFile = new File({
					uploader: username,
					filename: userfile.name,
					path: `files/${username}/${userfile.name}`,
					flag: flagname,
				});
				// 파일 업로드
				userfile.mv(`files/${username}/` + userfile.name, err => {
					if (err) return res.json({ msg: '업로드 실패' });
					newFile.save().then(() => res.json({ msg: '업로드 성공' }));
				});
			});
		} else {
			// 처음 업로드
			const newFile = new File({
				uploader: username,
				filename: userfile.name,
				path: `files/${username}/${userfile.name}`,
				flag: flagname,
			});
			// 파일 업로드
			userfile.mv(`files/${username}/` + userfile.name, err => {
				if (err) return res.json({ msg: '업로드 실패' });
				newFile.save().then(() => res.json({ msg: '업로드 성공' }));
			});
		}
	});
});

// 다운로드
router.get('/download/:username/:flagname', (req, res) => {
	const { username, flagname } = req.params;
	// 파일 찾기
	File.findOne({ uploader: username })
		.findOne({ flag: flagname })
		.then(file => res.data(file.path))
		.catch(() => {
			console.log(1123);
			res.json({ msg: '유저네임 혹은 플래그명을 확인해 주세요.' });
		});
});

module.exports = router;
