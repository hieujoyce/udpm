const { User } = require('../../models');
const jwt = require('../../helpers/jwt');

async function getUser(req) {
	const authorization = req.headers.authorization || '';
	if (authorization === '') return false;
	if (!authorization.startsWith('Bearer ')) return false;
	const token = authorization.slice(7, authorization.length);
	const payload = jwt.parse(token);
	if (payload === false) return false;
	const user = await User.query().findOne({ id: payload.userId });
	if (!user) return false;
	return user;
}

async function auth(req, res, next) {
	const user = await getUser(req);
	if (!user) {
		return res.status(401).send({
			message: 'You must be logged in',
		});
	}

	req.user = user;
	return next();
}

module.exports = auth;
