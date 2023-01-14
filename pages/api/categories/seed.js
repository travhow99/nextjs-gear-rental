import nc from 'next-connect';
import Category from '../../../models/Category';
import db from '../../../utils/db';

const categories = [
  { name: 'Ski' },
  { name: 'Snowboard' },
  { name: 'Hike & Camp' },
  { name: 'Bike' },
  { name: 'Travel' },
  { name: 'Surf' },
  { name: 'Snowshoe' },
  { name: 'Training' },
  { name: 'Run' },
  { name: 'Yoga' },
  { name: 'Paddle' },
  { name: 'Climb' },
  { name: 'Fly Fish' },
  { name: 'Wake' },
  { name: 'Dog Gear' },
];

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  await Category.deleteMany();
  await Category.insertMany(categories);

  await db.disconnect();

  res.send({ message: 'seeded successfully' });
});

export default handler;
