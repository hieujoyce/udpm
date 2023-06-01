const roleEnum = require('../../enums/Role');

const checkPermission = async (req, res, next) => {
  const userRole = req.user.role;

  if (userRole === roleEnum.USER) {
    return res.status(403).send({
      message: 'No permission to access this resource',
    });
  }

  return next();
};

module.exports = checkPermission;
