import { getMonth } from 'date-fns';
import nc from 'next-connect';
import BlockOut from '../../../../../models/BlockOut';
import Rental from '../../../../../models/Rental';
import SellerProduct from '../../../../../models/SellerProduct';
import db from '../../../../../utils/db';
import { onError } from '../../../../../utils/error';
import ProductHelper from '../../../../../utils/helpers/ProductHelper';

const handler = nc({ onError });

handler.get(async (req, res) => {
  try {
    await db.connect();

    const cutoff = now + 3;

    const sellerproduct = await SellerProduct.findById(req.query.id)
      .lean()
      .populate([
        //   'images',
        {
          path: 'rentals',
          match: {
            softDelete: { $ne: true },
            dateOut: {
              $lte: new Date(),
            },
          }, // Filter the softDeletes from view
        },
        {
          path: 'blockOuts',
          match: {
            softDelete: { $ne: true },
            dateOut: {
              $lte: new Date(),
            },
          }, // Filter the softDeletes from view
        },
      ]);

    await db.disconnect();

    res.send({
      bookings: ProductHelper.buildCalendar(sellerproduct),
      startMonth: getMonth(now),
      endMonth: getMonth(cutoff),
    });

    //   res.send(buildCalendar(sellerproduct));
  } catch (error) {
    console.log('err', error);
    res.status(404).send({ message: 'product not found' });
  }
});

export default handler;
