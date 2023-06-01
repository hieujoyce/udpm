const authService = require('../../services/auth');

async function me(req, res) {
  const responseData = await authService.me(req);

  return res.status(200).send(responseData);
}

module.exports = me;
