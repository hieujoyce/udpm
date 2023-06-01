const Joi = require('joi');

const userService = require('../../services/user');
const { abort } = require('../../../helpers/error');
const genderType = require('../../../enums/Gender');
const { uploadImage } = require('../../../config/cloudinary');

async function validation(userInformation) {
  try {
    const schema = Joi.object().keys({
      fullName: Joi.string().max(127),
      address: Joi.string(),
      gender: Joi.valid(...genderType.getValues()),
      dateOfBirth: Joi.date(),
    });
    return await schema.validateAsync(userInformation);
  } catch (error) {
    return abort(400, error.message);
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userInformation = req.body;
    const file = req?.file;

    const userImg = file && (await uploadImage(file?.path));
    await validation(userInformation);

    const data = await userService.updateUser({ userInformation, userImg, id });
    return res.status(200).send({
      message: 'Update user successfully',
      data,
    });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = updateUser;
