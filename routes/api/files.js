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
		if (!uploader) {
			// 처음 업로드
			const newFile = new File({
				uploader: username,
				files: [
					{
						uploader: username,
						filename: userfile.name,
						path: `files/${username}/${userfile.name}`,
						flag: flagname,
					},
				],
			});
			// 파일 업로드
			userfile.mv(`files/${username}/` + userfile.name, err => {
				if (err) return res.json({ err: 401 });
				newFile.save().then(() => res.json({ uploaded: true }));
			});
		} else {
			File.find({ files: { $elemMatch: { flag: flagname } } }).then(file => {
				if (file.length === 1) return res.json({ err: 400 });
				const addFile = {
					uploader: username,
					filename: userfile.name,
					path: `files/${username}/${userfile.name}`,
					flag: flagname,
				};
				// 파일 업로드
				userfile.mv(`files/${username}/` + userfile.name, err => {
					if (err) return res.json({ err: 401 });
					File.update({ uploader: username }, { $push: { files: addFile } }).then(() =>
						res.json({ uploaded: true })
					);
				});
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
			res.json({ msg: '유저네임 혹은 플래그명을 확인해 주세요.' });
		});
});

module.exports = router;
