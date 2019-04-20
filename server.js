const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

const app = express();

// body parser
app.use(express.json());

// DB 연결
const db = config.get('mongoURI');
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// 라우터
app.use('/api/users', require('./routes/api/users'));
app.use('/api/files', require('./routes/api/files'));

// 배포
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// 서버 생성
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
