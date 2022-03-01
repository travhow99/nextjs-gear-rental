import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';

const handler = nc({
  onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
  await db.connect();

  console.log(req.query.id);

  const sellerproduct = await SellerProduct.findById(req.query.id);
  console.log(sellerproduct);
  await db.disconnect();

  res.send(sellerproduct);
});

handler.put(async (req, res) => {
  await db.connect();

  SellerProduct.findByIdAndUpdate(
    req.query.id,
    req.body,
    { new: true },
    async (err, result) => {
      await db.disconnect();

      if (err) {
        console.log('err', err);
        res.status(404).send({ message: 'product not found' });
      } else {
        res.send({ message: 'product updated', result });
      }
    }
  );
});

export default handler;
