import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  console.log(req.query.id);

  const product = await Product.findById(req.query.id);
  console.log(product);
  await db.disconnect();

  res.send(product);
});

export default handler;
