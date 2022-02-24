import nc from 'next-connect';
import ProductImage from '../../../models/ProductImage';

import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const handler = nc({
  onError,
});
const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.use(isSeller, upload.array('files', 4)); // single('file'));

handler.post(async (req, res) => {
  const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          console.log('rej error', error);
          reject(error);
        }
      });
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
    // console.log('req file!', req.files); //['file0']);
  };

  /* await db.connect();

  const productImage = new ProductImage({
    ...req.body,
    user: req.user._id,
  });

  const image = await productImage.save();

  await db.disconnect(); */

  /**
   * @todo Make work with multi file upload
   */
  const promises = [];
  /* req.files.forEach((file) => {
    promises.push(streamUpload(file));
  }); */

  const result = await streamUpload(req.files[0]);

  await db.connect();

  const productImage = new ProductImage({
    user: req.user._id,
    path: result.secure_url,
    category: 'test',
  });

  const image = await productImage.save();

  await db.disconnect();

  res.send(image);
});

export default handler;
