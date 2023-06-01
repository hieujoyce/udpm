const { uploadImage } = require('../../config/cloudinary');
const { abort } = require('../../helpers/error');
const Banner = require('../../models/Banner');

exports.createBanner = async ({ alt, path, filename, position }) => {
  try {
    const result = await uploadImage(path, filename);
    const banner = await Banner.query().insert({
      alt,
      url: result.secure_url,
      position,
    });
    return banner;
  } catch (error) {
    abort(error.status, error.message);
  }
};

exports.getBanner = async () => {
  try {
    const banner = await Banner.query().select('id', 'alt', 'url', 'position');
    return banner;
  } catch (error) {
    abort(error.status, error.message);
  }
};

exports.deleteBanner = async (id) => {
  try {
    const banner = await Banner.query().deleteById(id);
    return banner;
  } catch (error) {
    abort(400, 'Params Error');
  }
};

exports.updateBanner = async (id, { alt, url }) => {
  try {
    const banner = await Banner.query().patchAndFetchById(id, {
      alt,
      url,
    });
    return banner;
  } catch (error) {
    abort(400, 'Params Error');
  }
};
