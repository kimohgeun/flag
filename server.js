const express = require('express');

const app = express();

// 서버 생성
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
