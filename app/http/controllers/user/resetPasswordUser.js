/* eslint-disable consistent-return */
const { abort } = require('../../../helpers/error');
const userService = require('../../services/user');

async function resetPasswordUser(req, res) {
  try {
    const { id } = req.params;
    await userService.resetPasswordUser({ id });
    return res.status(200).send({
      message: 'Reset password successfully',
    });
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = resetPasswordUser;
