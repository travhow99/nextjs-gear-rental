import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.use(isAuth); // @todo isSeller

handler.post(async (req, res) => {
  console.log('got post', {
    ...req.body,
    user: req.user._id,
  });
  await db.connect();

  const sellerProduct = new SellerProduct({
    ...req.body,
    user: req.user._id,
  });

  console.log('sprod:', sellerProduct);
  const product = await sellerProduct.save();
  console.log('save prod:', product);

  await db.disconnect();

  res.status(201).send(product);
});

export default handler;
