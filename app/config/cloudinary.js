const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const streamifier = require('streamifier')

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


// Upload

function uploadImage(localFilePath, fileName) {
  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(localFilePath, { public_id: fileName }, (err, result) => {
      if (err) {
        fs.unlinkSync(localFilePath);
        reject(err);
      } else {

        fs.unlinkSync(localFilePath);
        resolve(result);
      }
    });
  });
}

function upload3D(localFilePath) {
  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(localFilePath, { resource_type: "image" } , (err, result) => {
      if (err) {
        fs.unlinkSync(localFilePath);
        reject(err);
      } else {

        fs.unlinkSync(localFilePath);
        resolve(result);
      }
    });
  });
}


module.exports = {
  uploadImage,
  upload3D
};