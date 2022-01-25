import nc from 'next-connect';
import Order from '../../../../models/Order';
import { isAdmin } from '../../../../utils/Admin';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
  onError,
});

handler.use(isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id });

  await db.disconnect();
  res.send(orders);
});

export default handler;
