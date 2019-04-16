const express = require('express');
const auth = require('../../middleware/auth');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const fs = require('fs');

const router = express.Router();

// 스키마
const File = require('../../models/File');

// AWS S3
const awsS3 = require('../../config/default.json').awsS3;
const s3 = new AWS.S3(awsS3);

// 파일 업로드
router.post('/upload', auth, (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err) throw err;
		const { username, flagname } = fields;
		const { userfile } = files;
		File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { filename: userfile.name } } }] }).then(
			file => {
				// 파일 중복
				if (file !== null) {
					return res.status(400).json({ err: '파일 중복' });
				} else {
					File.findOne({
						$and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }],
					}).then(file => {
						// 플래그 중복
						if (file !== null) return res.status(400).json({ err: '플래그 중복' });
						const encodeName = encodeURIComponent(`${userfile.name}`);
						// 객체 생성
						const addFile = {
							name: userfile.name,
							path: `https://s3.ap-northeast-2.amazonaws.com/flag-kog/${username}/${encodeName}`,
							flag: flagname,
						};
						// 파일 저장
						const params = {
							Bucket: 'flag-kog',
							Key: `${username}/${userfile.name}`,
							ACL: 'public-read',
							Body: fs.createReadStream(userfile.path),
						};
						s3.upload(params, err => {
							if (err) {
								return res.status(400).json({ err: '업로드 실패' });
							} else {
								// DB 저장
								File.update({ uploader: username }, { $push: { files: addFile } }).then(() => {
									File.findOne({ uploader: username }).then(file => {
										res.json(file);
									});
								});
							}
						});
					});
				}
			}
		);
	});
});

// 파일 삭제
router.get('/delete/:username/:flagname', auth, (req, res) => {
	const { username, flagname } = req.params;
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] }).then(file => {
		const deleteFile = file.files.filter(file => {
			return file.flag === flagname;
		});
		const fileName = deleteFile[0].filename;
		// 파일 삭제
		s3.deleteObject(
			{
				Bucket: 'flag-kog',
				Key: `${username}/${fileName}`,
			},
			err => {
				if (err) {
					return res.status(400).json(err);
				} else {
					// DB 삭제
					File.update({ uploader: username }, { $pull: { files: { flag: flagname } } }).then(() => {
						res.json(flagname);
					});
				}
			}
		);
	});
});

// 파일 다운로드
router.get('/download/:username/:flagname', (req, res) => {
	const { username, flagname } = req.params;
	// 파일 찾기
	File.findOne({ $and: [{ uploader: username }, { files: { $elemMatch: { flag: flagname } } }] })
		.then(file => {
			// 유저네임 혹은 플래그 불일치
			if (file === null) return res.status(400).send();
			const downFile = file.files.filter(file => {
				return file.flag === flagname;
			});
			const fileName = downFile[0].name;
			const filePath = downFile[0].path;
			res.json({
				fileName: fileName,
				filePath: filePath,
			});
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

module.exports = router;
