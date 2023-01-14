import nc from 'next-connect';
import Rental from '../../../models/Rental';
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

  const rental = await Rental.findById(req.query.id);
  console.log(rental);
  await db.disconnect();

  res.send(rental);
});

handler.put(async (req, res) => {
  await db.connect();

  Rental.findByIdAndUpdate(
    req.query.id,
    req.body,
    { new: true },
    async (err, result) => {
      await db.disconnect();

      if (err) {
        console.log('err', err);
        res.status(404).send({ message: 'rental not found' });
      } else {
        res.send({ message: 'rental updated', result });
      }
    }
  );
});

handler.delete(async (req, res) => {
  await db.connect();

  Rental.findByIdAndUpdate(
    req.query.id,
    { softDelete: true },
    async (err, result) => {
      await db.disconnect();

      if (err) {
        console.log('err', err);
        res.status(404).send({ message: 'rental not found' });
      } else {
        res.send({ message: 'rental deleted', result });
      }
    }
  );
});

export default handler;
