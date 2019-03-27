const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// DB 연결
const db = config.get('mongoURI');
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// 서버 생성
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
