import nc from 'next-connect';
import db from '../../../../utils/db';
import Rental from '../../../../models/Rental';
import BlockOut from '../../../../models/BlockOut';
import { onError } from '../../../../utils/error';
import SellerProduct from '../../../../models/SellerProduct';

const handler = nc({ onError });

handler.get(async (req, res) => {
  try {
    await db.connect();

    const sellerproduct = await SellerProduct.findById(req.query.id)
      .lean()
      .populate([
        //   'images',
        'rentals',
        {
          path: 'blockOuts',
          match: { softDelete: { $ne: true } }, // Filter the softDeletes from view
        },
      ]);

    await db.disconnect();

    res.send(buildCalendar(sellerproduct));
  } catch (error) {
    console.log('err', error);
    res.status(404).send({ message: 'product not found' });
  }
});

const buildCalendar = (data) => {
  const blockOuts = data.blockOuts.map((bo) => {
    return { out: bo.dateOut, in: bo.dateIn };
  });

  const rentals = data.rentals.map((bo) => {
    return { out: bo.dateOut, in: bo.dateDue };
  });

  return [...blockOuts, ...rentals];
};

export default handler;
