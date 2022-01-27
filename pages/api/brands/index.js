import nc from 'next-connect';
import Brand from '../../../models/Brand';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  const brands = await Brand.find({});

  await db.disconnect();

  res.send(brands);
});

export default handler;
