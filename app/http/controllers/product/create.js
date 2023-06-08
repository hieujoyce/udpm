const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');
const convertToSlug = require('../../../utils/common');
const { uploadImage, upload3D } = require('../../../config/cloudinary');

async function validation({
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
  quantity,
}) {
  try {
    const schema = Joi.object().keys({
      productName: Joi.string().required(),
      productSlug: Joi.string().required(),
      categoryId: Joi.number().integer().min(0).required(),
      productCode: Joi.string().required(),
      productSize: Joi.string().required(),
      productColor: Joi.string().required(),
      sellingPrice: Joi.number().min(0).required(),
      discountPrice: Joi.number().min(0).required(),
      productDescription: Joi.string().required(),
      productThumbnail: Joi.string().required(),
      product3DModelPath: Joi.string().required(),
      productImg: Joi.string().required(),
      quantity: Joi.number().min(0).required(),
    });

    return await schema.validateAsync({
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
      quantity,
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  try {
    const {
      productName,
      productSize,
      productColor,
      discountPrice,
      sellingPrice,
      productDescription,
      categoryId,
      productImg,
      quantity,
    } = req.body;
    const productCode = `${productName}${Math.floor(Math.random() * 1000)}`;
    await validation({
      productName,
      productSlug: productName,
      productCode,
      productSize,
      productColor,
      discountPrice,
      sellingPrice,
      productDescription,
      categoryId,
      productThumbnail: productDescription,
      product3DModelPath: 'product3DModelPath',
      productImg,
      quantity,
    });
    const data = await productService.create({
      productName,
      productSlug: productName,
      productCode,
      productSize,
      productColor,
      discountPrice,
      sellingPrice,
      productDescription,
      categoryId,
      productThumbnail: productDescription,
      product3DModelPath: 'product3DModelPath',
      productImg,
      quantity,
    });
    if (data) {
      return res.status(200).send({
        message: 'Create product success',
        data,
      });
    }
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = create;
