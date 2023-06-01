const Joi = require('joi');
const { abort } = require('../../../helpers/error');
const auth = require('../../services/auth');

const validate = async (params) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(6),
    });

    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const signIn = async (req, res) => {
  const params = {
    email: req.body.email,
    password: req.body.password,
  };
  await validate(params);
  const result = await auth.signIn(params);

  return res.status(200).send(result);
};

module.exports = signIn;
