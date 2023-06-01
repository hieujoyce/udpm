const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');
const { uploadImage, upload3D } = require('../../../config/cloudinary');
const convertToSlug = require('../../../utils/common');

async function validation({
  productId,
  productName,
  productSlug,
  productCode,
  productSize,
  productColor,
  discountPrice,
  sellingPrice,
  productDescription,
  categoryId,
  productThumbnail,
  product3DModelPath,
  productImg,
}) {
  try {
    const schema = Joi.object().keys({
      productId: Joi.number().min(1),
      productName: Joi.string(),
      productSlug: Joi.string(),
      categoryId: Joi.number().integer().min(0),
      productCode: Joi.string(),
      productSize: Joi.string(),
      productColor: Joi.string(),
      sellingPrice: Joi.number().min(0),
      discountPrice: Joi.number().min(0),
      productDescription: Joi.string(),
      productThumbnail: Joi.string(),
      product3DModelPath: Joi.string(),
      productImg: Joi.string(),
    });

    return await schema.validateAsync({
      productId,
      productName,
      productSlug,
      productCode,
      productSize,
      productColor,
      discountPrice,
      sellingPrice,
      productDescription,
      categoryId,
      productThumbnail,
      product3DModelPath,
      productImg,
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  try {
    const { productId, categoryId } = req.params;

    const params = req.body;
    const listFile = req.files;
    const findIndexHaveFileIsGlb = listFile.findIndex((file) =>
      file.originalname.includes('.glb')
    );
    const resultFile3D = await upload3D(listFile[findIndexHaveFileIsGlb]?.path);

    listFile.splice(findIndexHaveFileIsGlb, 1);
    const resultFileImage = await uploadImage(listFile[0]?.path);

    const productImages = [];
    for (let i = 1; i < listFile.length; i++) {
      const imageURL = await uploadImage(listFile[i]?.path);
      productImages.push(imageURL?.secure_url);
    }
    const productSlug = convertToSlug(params.productName);

    await validation({
      ...params,
      productId: productId,
      categoryId: categoryId,
      productSlug,
      productImg: productImages.join(','),
      product3DModelPath: resultFile3D?.secure_url,
      productThumbnail: resultFileImage?.secure_url,
    });

    const data = await productService.update({
      ...params,
      productId: productId,
      categoryId: categoryId,
      productImg: productImages.join(','),
      productSlug,
      product3DModelPath: resultFile3D?.secure_url,
      productThumbnail: resultFileImage?.secure_url,
    });
    if (data) {
      return res.status(200).send({
        message: 'Update product success',
        data,
      });
    }
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = update;
