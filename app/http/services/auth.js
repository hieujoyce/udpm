const bcrypt = require('bcrypt');
const { generate } = require('../../helpers/jwt');

const { User } = require('../../models');
const { abort } = require('../../helpers/error');
const roleEnum = require('../../enums/Role');
const { sendEmail } = require('../../helpers/mailer');
const { randomCode } = require('../../helpers/utils');
const { log } = require('handlebars');

exports.signIn = async ({ email, password }) => {
  const user = await User.query().findOne('email', email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return abort(400, 'email or password is incorrect');
  await this.sendCode({ email });
  //const accessToken = await generate({ userId: user.id });
  //return { accessToken };
  return { msg: 'Please check email to enter code' };
};

exports.signUp = async ({ email, password }) => {
  const findUser = await User.query().findOne({
    email,
  });

  if (findUser) return abort(400, 'Email is already exist');

  const salt = parseInt(process.env.SALT_ROUNDS, 10);
  const hashPassword = await bcrypt.hash(password, salt);

  // if (roleEnum[role.toUpperCase()]) {
  const user = await User.query().insert({
    email,
    password: hashPassword,
    role: 2,
    refreshToken: process.env.REFRESH_TOKEN,
  });

  const result = {
    id: user.id,
    email: user.email,
  };

  return result;
};

exports.me = (req) => {
  const { user } = req;

  if (user.role === roleEnum.ADMIN || user.role === roleEnum.USER) {
    delete user.password;

    return user;
  }
  throw new Error('Unauthorized');
};

exports.sendCode = async ({ email }) => {
  const user = await User.query().findOne({ email });
  const code = randomCode();
  console.log('OTP: ' + code);
  const salt = parseInt(process.env.SALT_ROUNDS, 10);
  const hashCode = await bcrypt.hash(code, salt);
  if (!user) abort(400, 'User is not found');

  // await sendEmail({
  //   subject: 'Forgot Password',
  //   text: `code verify is ${code}`,
  //   to: email,
  //   from: process.env.EMAIL,
  // });
  // console.log(typeof code);
  // console.log(typeof new Date());
  // console.log(new Date());
  await user.$query().update({
    code: hashCode,
    code_time: new Date(),
  });
};

exports.verifyCode = async ({ email, code }) => {
  const user = await User.query().findOne({ email });
  if (!user) abort(400, 'User is not found');
  if (new Date().getTime() > new Date(user.code_time).getTime() + 2 * 60 * 1000)
    abort(400, 'Code is expired');
  if (!(await bcrypt.compare(code, user.code))) abort(400, 'Code is not valid');
  const accessToken = await generate({ userId: user.id });
  return accessToken;
};

exports.forgotPass = async ({ email, code, password }) => {
  const user = await User.query().findOne({ email });
  if (!user) abort(400, 'User is not found');

  if (
    new Date().getTime() >
    new Date(user.code_time).getTime() + 60 * 60 * 1000
  )
    abort(400, 'Code is expired');
  if (code !== user.code) abort(400, 'Code is not valid');

  const salt = parseInt(process.env.SALT_ROUNDS, 10);
  const hashPassword = await bcrypt.hash(password, salt);

  await user.$query().update({
    code: null,
    code_time: null,
    password: hashPassword,
  });
};
