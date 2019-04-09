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
				return res.status(400).json({ err: '파일 중복' });
			} else {
				File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(
					file => {
						// 플래그 중복
						if (file !== null) return res.status(400).json({ err: '플래그 중복' });
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
							if (err) return res.status(400).json({ err: '업로드 실패' });
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
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] })
		.then(file => {
			// 유저네임 혹은 플래그 불일치
			if (file === null) return res.status(400).send();
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
		})
		.catch(err => res.status(400).json(err));
});

// 파일 리스트
router.get('/list/:username', auth, (req, res) => {
	const { username } = req.params;
	File.findOne({ uploader: username })
		.then(uploader => {
			// 파일 리스트 없음
			if (uploader.files.length === 0) return res.json([]);
			// 파일 리스트 있음
			res.json(uploader.files);
		})
		.catch(err => res.status(400).json(err));
});

// 파일 삭제
router.get('/delete/:username/:flagname', auth, (req, res) => {
	const { username, flagname } = req.params;
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(file => {
		const deleteFile = file.files.filter(file => {
			return file.flag === flagname;
		});
		const filePath = deleteFile[0].path;
		// DB 삭제
		File.update({ uploader: username }, { $pull: { files: { flag: flagname } } })
			// 파일 삭제
			.then(() => fs.unlinkSync(filePath))
			.then(() => {
				res.json(flagname);
			})
			.catch(err => res.status(400).json(err));
	});
});

module.exports = router;
