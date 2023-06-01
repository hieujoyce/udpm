const bcrypt = require('bcrypt');
const { User } = require('../../models');

const { abort } = require('../../helpers/error');

exports.updateUser = async ({ userInformation, userImg, id }) => {
  try {
    const user = await User.query().findOne({ id });

    if (!user) {
      return abort(400, 'User not found');
    }
    const result = await User.query()
      .findById(id)
      .update({
        ...userInformation,
        image: userImg?.secure_url,
      });

    return result;
  } catch (error) {
    abort(error.status, error.message);
  }
};

exports.getUsers = async ({ page, limit, keyword }) => {
  const offset = page * limit - limit;

  const users = await User.query()
    .where('email', 'like', `%${keyword || ''}%`)
    .orWhere('fullName', 'like', `%${keyword || ''}%`)
    .limit(limit)
    .offset(offset);

  const [{ 'count(*)': total }] = await User.query()
    .where('email', 'like', `%${keyword || ''}%`)
    .orWhere('fullName', 'like', `%${keyword || ''}%`)
    .count();

  return {
    users,
    total,
  };
};

exports.deleteUser = async ({ id }) => {
  const user = await User.query().findOne({ id });
  if (!user) {
    return abort(400, 'User not found');
  }
  await User.query().del();

  return '';
};

exports.resetPasswordUser = async ({ id }) => {
  const user = await User.query().findOne({ id });
  if (!user) {
    return abort(400, 'User not found');
  }
  // eslint-disable-next-line no-undef
  const salt = parseInt(process.env.SALT_ROUNDS, 10);
  const hashPassword = await bcrypt.hash(123456, salt);
  await User.query().findById(id).update({
    password: hashPassword,
  });
  return true;
};
