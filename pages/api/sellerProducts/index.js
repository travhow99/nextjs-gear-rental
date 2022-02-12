import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';

const handler = nc({
  onError,
});

handler.use(isSeller); // @todo isSeller

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
