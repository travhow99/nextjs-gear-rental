import nc from 'next-connect';
import Brand from '../../../models/Brand';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  console.log(req.query.id);

  const brand = await Brand.findById(req.query.id);
  console.log(brand);
  await db.disconnect();

  res.send(brand);
});

export default handler;
