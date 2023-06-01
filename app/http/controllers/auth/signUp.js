const Joi = require('joi');

const auth = require('../../services/auth');
const { abort } = require('../../../helpers/error');

const validate = async (params) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
      passwordConfirmation: Joi.equal(Joi.ref('password')).required(),
    });

    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const signUp = async (req, res) => {
  const params = {
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  };
  await validate(params);
  const result = await auth.signUp(params);
  return res.status(200).send({ data: result, message: 'Sign up successfully' });
};

module.exports = signUp;
