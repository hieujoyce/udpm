const { getAllDivisionsService } = require('../../services/provinces');

async function getAllDivisions(req, res, next) {
  try {
    const { depth } = req.query;
    const result = await getAllDivisionsService({ depth });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllDivisions;
