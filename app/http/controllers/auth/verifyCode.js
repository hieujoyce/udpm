const Joi = require('joi');

const authService = require('../../services/auth');

const validate = async ({ email, code }) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      code: Joi.number().required(),
    });

    return await schema.validateAsync({ email, code });
  } catch (error) {
    return error;
  }
};

const sendCode = async (req, res) => {
  const { email, code } = req.body;
  await validate({ email, code });

  const accessToken = await authService.verifyCode({ email, code });
  res.status(200).json({
    msg: 'Verify code success.',
    accessToken,
  });
};

module.exports = sendCode;
