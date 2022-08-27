import nc from 'next-connect';
import db from '../../../../utils/db';
import Rental from '../../../../models/Rental';
import BlockOut from '../../../../models/BlockOut';
import { onError } from '../../../../utils/error';
import SellerProduct from '../../../../models/SellerProduct';
import ProductHelper from '../../../../utils/helpers/ProductHelper';
import { getMonth, startOfToday } from 'date-fns';

const handler = nc({ onError });

handler.get(async (req, res) => {
	try {
		await db.connect();

		// console.log('query!', req);

		const today = startOfToday();
		const cutoff = ProductHelper.getFutureMonth(today);
		console.log(today);
		console.log(cutoff);

		// @todo Add to api methods
		const sellerproduct = await SellerProduct.findById(req.query.id)
			.lean()
			.populate([
				//   'images',
				{
					path: 'rentals',
					match: {
						softDelete: { $ne: true }, // Filter the softDeletes from view
						dateOut: {
							$gte: today,
							$lt: cutoff,
						},
					},
				},
				{
					path: 'blockOuts',
					match: {
						softDelete: { $ne: true }, // Filter the softDeletes from view
						$or: [
							{
								dateOut: {
									$gte: today,
									$lt: cutoff,
								},
							},
							{
								dateIn: {
									$gte: today,
									$lt: cutoff,
								},
							},
						],
					},
				},
			]);

		await db.disconnect();

		res.send({
			bookings: ProductHelper.buildCalendar(sellerproduct),
			startMonth: getMonth(today),
			endMonth: getMonth(cutoff),
		});
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'product not found' });
	}
});

export default handler;
