import nc from 'next-connect';
import Brand from '../../../models/Brand';
import db from '../../../utils/db';
import brands from '../../../components/brands/seed';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  await Brand.deleteMany();
  await Brand.insertMany(brands);

  await db.disconnect();

  res.send({ message: 'seeded successfully' });
});

export default handler;
