import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  const sellerproducts = await SellerProduct.find({});

  await db.disconnect();

  res.send(sellerproducts);
});

export default handler;
