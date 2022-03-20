import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import ProductImage from '../../../models/ProductImage';

import BlockOut from '../../../models/BlockOut';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';

const handler = nc({
  onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
  try {
    await db.connect();

    const products = await SellerProduct.find({
      user_id: req.user._id,
    }).populate([
      'images',
      // 'rentals',
      {
        path: 'blockOuts',
        match: { softDelete: { $ne: true } }, // Filter the softDeletes from view
      },
    ]);

    await db.disconnect();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

handler.post(async (req, res) => {
  await db.connect();

  const sellerProduct = new SellerProduct({
    ...req.body,
    user: req.user._id,
  });

  const product = await sellerProduct.save();

  await db.disconnect();

  res.status(201).send(product);
});

export default handler;
