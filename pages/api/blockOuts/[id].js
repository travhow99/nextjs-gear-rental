import nc from 'next-connect';
import BlockOut from '../../../models/BlockOut';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';

const handler = nc({
  onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
  await db.connect();

  console.log(req.query.id);

  const blockOut = await BlockOut.findById(req.query.id);
  console.log(blockOut);
  await db.disconnect();

  res.send(blockOut);
});

handler.put(async (req, res) => {
  await db.connect();

  BlockOut.findByIdAndUpdate(
    req.query.id,
    req.body,
    { new: true },
    async (err, result) => {
      await db.disconnect();

      if (err) {
        console.log('err', err);
        res.status(404).send({ message: 'blockout not found' });
      } else {
        res.send({ message: 'blockout updated', result });
      }
    }
  );
});

handler.delete(async (req, res) => {
  await db.connect();

  BlockOut.findByIdAndUpdate(
    req.query.id,
    { softDelete: true },
    async (err, result) => {
      await db.disconnect();

      if (err) {
        console.log('err', err);
        res.status(404).send({ message: 'blockout not found' });
      } else {
        res.send({ message: 'blockout deleted', result });
      }
    }
  );
});

export default handler;
