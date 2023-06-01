const { getAllDivisionsService } = require('../../services/provinces');

async function getAllDivisions(req, res, next) {
  try {
    const result = await getAllDivisionsService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllDivisions;
