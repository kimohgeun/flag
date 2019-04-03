const express = require('express');
const auth = require('../../middleware/auth');
const File = require('../../models/File');
const mime = require('mime');
const fs = require('fs');

const router = express.Router();

// 파일 업로드
router.post('/upload', auth, (req, res) => {
	const { username, flagname } = req.body;
	const { userfile } = req.files;
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { filename: userfile.name } } }] }).then(
		file => {
			// 파일 중복
			if (file !== null) {
				return res.json({ err: 400 });
			} else {
				File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(
					file => {
						// 플래그 중복
						if (file !== null) return res.json({ err: 401 });
						// 객체 생성
						const addFile = {
							uploader: username,
							filename: userfile.name,
							path: `files/${username}/${userfile.name}`,
							flag: flagname,
						};
						// 파일 저장
						userfile.mv(`files/${username}/` + userfile.name, err => {
							// 저장 실패
							if (err) return res.json({ err: 402 });
							// DB 저장
							File.update({ uploader: username }, { $push: { files: addFile } }).then(() =>
								res.json(addFile)
							);
						});
					}
				);
			}
		}
	);
});

// 파일 다운로드
router.get('/download/:username/:flagname', (req, res) => {
	const { username, flagname } = req.params;
	// 파일 찾기
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(file => {
		// 유저네임 혹은 플래그 불일치
		if (file === null) return res.json({ err: 403 });
		// 다운로드 파일
		const findFile = file.files.filter(file => {
			return file.flag === flagname;
		});

		const filePath = findFile[0].path;
		const fileName = findFile[0].filename;

		const mimetype = mime.lookup(filePath);
		// 파일명 인코딩
		res.setHeader('fileName', encodeURIComponent(fileName));
		res.setHeader('Content-type', mimetype);

		const filestream = fs.createReadStream(filePath);
		filestream.pipe(res);
	});
});

// 파일 리스트 가져오기
router.get('/list/:username', auth, (req, res) => {
	const { username } = req.params;
	File.findOne({ uploader: username }).then(uploader => {
		// 파일 리스트 없음
		if (uploader.files.length === 0) return res.json([]);
		// 파일 리스트 있음
		res.json(uploader.files);
	});
});

// 파일 삭제
router.get('/delete/:username/:flagname', auth, (req, res) => {
	const { username, flagname } = req.params;
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(file => {
		const findFile = file.files.filter(file => {
			return file.flag === flagname;
		});
		const filePath = findFile[0].path;
		// 파일 삭제
		fs.unlinkSync(filePath);
		// DB 삭제
		File.update({ uploader: username }, { $pull: { files: { flag: flagname } } }).then(() => {
			res.json(flagname);
		});
	});
});

module.exports = router;
