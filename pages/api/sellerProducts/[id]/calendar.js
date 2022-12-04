import nc from 'next-connect';
import db from '../../../../utils/db';
import Rental from '../../../../models/Rental';
import BlockOut from '../../../../models/BlockOut';
import { onError } from '../../../../utils/error';
import SellerProduct from '../../../../models/SellerProduct';
import ProductHelper from '../../../../utils/helpers/ProductHelper';
import { addDays, getMonth, startOfDay, startOfToday } from 'date-fns';
import { isAuth } from '../../../../utils/auth';

const handler = nc({ onError });

handler.use(isAuth);

handler.get(async (req, res) => {
	try {
		await db.connect();

		const sellerOwnsProduct = await SellerProduct.sellerOwnsProduct(
			req.user._id,
			req.query.id
		);

		console.log('s owns p?', sellerOwnsProduct);

		const startDate = sellerOwnsProduct
			? startOfDay(addDays(new Date(), -365 * 2))
			: startOfToday();
		const cutoff = sellerOwnsProduct
			? startOfDay(addDays(new Date(), 365 * 2))
			: ProductHelper.getFutureMonth(startDate);
		console.log(startDate);
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
							$gte: startDate,
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
									$gte: startDate,
									$lt: cutoff,
								},
							},
							{
								dateIn: {
									$gte: startDate,
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
			startMonth: getMonth(startDate),
			endMonth: getMonth(cutoff),
		});
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'product not found' });
	}
});

export default handler;
