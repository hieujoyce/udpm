

const { upload3D } = require('../../../config/cloudinary');
const { abort } = require('../../../helpers/error');

async function uploadFile3d(req, res) {
  try {
    const listFile = req.files;
    const findIndexHaveFileIsGlb = listFile.findIndex((file) => file.originalname.includes('.glb'));
    const result = await upload3D(filePath);
    // console.log(result);
    // if (filePath === undefined) return abort(400, 'File is not already exists');
    // res.status(200).send({ message: 'Upload file success', data: filePath });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = uploadFile3d;
