import nc from 'next-connect';
import db from '../../../../utils/db';
import Rental from '../../../../models/Rental';
import BlockOut from '../../../../models/BlockOut';
import { onError } from '../../../../utils/error';
import SellerProduct from '../../../../models/SellerProduct';
import ProductHelper from '../../../../utils/helpers/ProductHelper';
import { addDays, getMonth, startOfDay, startOfToday } from 'date-fns';
import { authCheck } from '../../../../utils/authCheck';
import { sellerOwnsProduct } from '../../../../utils/helpers/api/SellerProductHelper';
import prisma from '../../../../lib/prisma';

const handler = nc({ onError });

handler.use(authCheck);

handler.get(async (req, res) => {
	try {
		const ownsProduct = await sellerOwnsProduct(req.user.id, req.query.id);

		console.log('s owns p?', ownsProduct);

		const startDate = ownsProduct
			? startOfDay(addDays(new Date(), -365 * 2))
			: startOfToday();
		const cutoff = ownsProduct
			? startOfDay(addDays(new Date(), 365 * 2))
			: ProductHelper.getFutureMonth(startDate);
		console.log(startDate);
		console.log(cutoff);

		// @todo Add to api methods
		const sellerProduct = await prisma.sellerProduct.findUnique({
			where: {
				id: req.query.id,
			},
			include: {
				images: true,
				user: {
					select: {
						id: true,
						name: true,
					},
				},
				/**
				 * @todo verify & test query
				 * @todo don't include past dates for storefront query
				 */
				blockOuts: {
					where: {
						AND: {
							dateOut: {
								gte: startDate,
								lte: cutoff,
							},
							dateIn: {
								gte: startDate,
								lt: cutoff,
							},
							OR: [{ softDelete: false }, { softDelete: null }],
						},
					},
				},
				/**
				 * @todo verify & test query
				 * @todo don't include past dates for storefront query
				 */
				rentals: {
					where: {
						AND: {
							dateOut: {
								gte: startDate,
								lte: cutoff,
							},
							dateDue: {
								gte: startDate,
								lt: cutoff,
							},
							OR: [{ softDelete: false }, { softDelete: null }],
						},
					},
				},
			},
		});

		console.log('SPO:', sellerProduct);

		res.send({
			bookings: ProductHelper.buildCalendar(sellerProduct),
			startMonth: getMonth(startDate),
			endMonth: getMonth(cutoff),
		});
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'product not found' });
	}
});

export default handler;
