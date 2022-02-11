import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  console.log(req.query.id);

  const sellerproduct = await SellerProduct.findById(req.query.id);
  console.log(sellerproduct);
  await db.disconnect();

  res.send(sellerproduct);
});

export default handler;
