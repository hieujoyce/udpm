const Joi = require('joi');

const authService = require('../../services/auth');

const validate = async ({ email, code, password }) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      code: Joi.number().required(),
      password: Joi.string().required(),
    });

    return await schema.validateAsync({ email, code, password });
  } catch (error) {
    return error;
  }
};

const forgotPassword = async (req, res) => {
  const { email, code, password } = req.body;
  await validate({ email, code, password });

  await authService.forgotPass({ email, code, password });
  res.sendStatus(200);
};

module.exports = forgotPassword;
