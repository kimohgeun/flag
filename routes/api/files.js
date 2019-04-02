const express = require('express');
const auth = require('../../middleware/auth');
const File = require('../../models/File');
const mime = require('mime');
const fs = require('fs');

const router = express.Router();

// 업로드
router.post('/upload', (req, res) => {
	const { username, flagname } = req.body;
	const { userfile } = req.files;

	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(file => {
		// 플래그명 중복
		if (file !== null) return res.json({ err: 400 });
		// 파일 업로드
		const addFile = {
			uploader: username,
			filename: userfile.name,
			path: `files/${username}/${userfile.name}`,
			flag: flagname,
		};
		userfile.mv(`files/${username}/` + userfile.name, err => {
			if (err) return res.json({ err: 401 });
			File.update({ uploader: username }, { $push: { files: addFile } }).then(() => res.json({ uploaded: true }));
		});
	});
});

// 다운로드
router.get('/download/:username/:flagname', (req, res) => {
	const { username, flagname } = req.params;
	// 파일 찾기
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(file => {
		
		// 유저네임 혹은 플래그 불일치
		if (file === null) return res.json({ err: 402 });

		const findFile = file.files.filter(file => {
			return file.flag === flagname;
		});
		
		const filePath = findFile[0].path;
		const fileName = findFile[0].filename;

		const mimetype = mime.lookup(filePath);;

		res.setHeader('fileName', encodeURIComponent(fileName)); // 파일명 인코딩
		res.setHeader('Content-type', mimetype);

		const filestream = fs.createReadStream(filePath);
		filestream.pipe(res);
	});
});

// 파일 리스트 가져오기
router.get('/list/:username', (req, res) => {
	const { username } = req.params;
	File.findOne({ uploader: username }).then(uploader => {
		// 파일 없음
		if (uploader.files.length === 0) return res.json({ list: [] });
		// 파일 있음
		res.json(uploader.files);
	});
});

module.exports = router;
