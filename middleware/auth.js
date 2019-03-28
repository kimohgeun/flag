const config = require('config');
const jwt = require('jsonwebtoken');

auth = (req, res, next) => {
	const token = req.header('x-auth-token');
	// 토큰 확인
	if (!token) return res.status(401).json({ msg: '토큰이 존재하지 않습니다.' });

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).json({ msg: '토큰이 만료되었습니다.' });
	}
};

module.exports = auth;