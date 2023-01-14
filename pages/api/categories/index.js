import nc from 'next-connect';
import Category from '../../../models/Category';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();

  const categories = await Category.find({});

  await db.disconnect();

  res.send(categories);
});

handler.post(async (req, res) => {
  await db.connect();

  const newCategory = new Category(req.body);
  const category = await newCategory.save();

  res.status(201).send(category);
});

export default handler;
