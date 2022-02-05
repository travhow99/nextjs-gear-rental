import nc from 'next-connect';
import Category from '../../../models/Category';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  console.log(req.query.id);

  const category = await Category.findById(req.query.id);
  console.log(category);
  await db.disconnect();

  res.send(category);
});

export default handler;
