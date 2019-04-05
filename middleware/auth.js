const config = require('config');
const jwt = require('jsonwebtoken');

auth = (req, res, next) => {
	const token = req.header('x-auth-token');
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded;
		next();
	} catch (error) {
		// 토큰 만료
		res.json({ err: '토큰 만료' });
	}
};

module.exports = auth;
