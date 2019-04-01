const express = require('express');
const config = require('config');
const auth = require('../../middleware/auth');
const File = require('../../models/File');
const fs = require('fs');

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
			File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(
				file => {
					if (file !== null) return res.json({ err: 400 });
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
				}
			);
		}
	});
});

// 다운로드
router.get('/download/:username/:flagname', (req, res) => {
	const { username, flagname } = req.params;
	// 파일 찾기
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(file => {
		const findFile = file.files.filter(file => {
			return file.flag === flagname;
		});
		const filePath = findFile[0].path;
		res.download(filePath);
	});
});

// 파일이름 찾기
router.get('/filename/:username/:flagname', (req, res) => {
	const { username, flagname } = req.params;
	// 파일 찾기
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(file => {
		// 유저네임 혹은 플래그 불일치
		if (file === null) return res.json({ err: 400 });
		const findFile = file.files.filter(file => {
			return file.flag === flagname;
		});
		const fileName = findFile[0].filename;
		res.json({ filename: fileName });
	});
});

module.exports = router;
