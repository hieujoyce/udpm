const Joi = require('joi');

const userService = require('../../services/user');
const { abort } = require('../../../helpers/error');

async function validation(searchInformation) {
  try {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(0).required(),
      page: Joi.number().integer().min(0).required(),
      keyword: Joi.string().allow(''),
      role: Joi.number().valid(1, 2).allow(''),
    });

    return await schema.validateAsync(searchInformation);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getUsers(req, res) {
  const searchInformation = {
    limit: req.query.limit,
    page: req.query.page,
    keyword: req.query.keyword,
    role: req.query.role || '',
  };

  await validation(searchInformation);

  const responseData = await userService.getUsers(searchInformation);
  if (req.query.role) {
    const dataFilter = responseData.users.filter(
      (item) => item.role === Number(req.query.role)
    );
    return res.status(200).send({
      users: dataFilter,
      total: dataFilter.length,
    });
  }
  return res.status(200).send(responseData);
}

module.exports = getUsers;
