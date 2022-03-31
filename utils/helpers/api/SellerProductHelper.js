import BlockOut from '../../../models/BlockOut';
import Rental from '../../../models/Rental';
import SellerProduct from '../../../models/SellerProduct';
import ProductImage from '../../../models/ProductImage';

/**
 * Library of helper methods for SellerProduct on the server side
 */
const SellerProductHelper = {
  fetchCalendarData: async () => {
    await SellerProduct.findById(req.query.id)
      .lean()
      .populate([
        //   'images',
        {
          path: 'rentals',
          match: {
            softDelete: { $ne: true }, // Filter the softDeletes from view
            dateOut: {
              $gte: now,
              $lt: cutoff,
            },
          },
        },
        {
          path: 'blockOuts',
          match: {
            softDelete: { $ne: true }, // Filter the softDeletes from view
            dateOut: {
              $gte: now,
              $lt: cutoff,
            },
          },
        },
      ]);
  },
};

export default SellerProductHelper;
