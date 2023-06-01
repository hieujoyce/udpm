const Joi = require('joi');

const authService = require('../../services/auth');

const validate = async ({ email }) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    return await schema.validateAsync({ email });
  } catch (error) {
    return error;
  }
};

const sendCode = async (req, res) => {
  const { email } = req.body;
  await validate({ email });
  try {
    await authService.sendCode({ email });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json('Send code success.');
};

module.exports = sendCode;
