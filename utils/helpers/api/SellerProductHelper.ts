import BlockOut from '../../../models/BlockOut';
import Rental from '../../../models/Rental';
import SellerProduct from '../../../models/SellerProduct';
import ProductImage from '../../../models/ProductImage';
import prisma from '../../../lib/prisma';
import User from '../../../types/User';
import Product from '../../../types/Product';

/**
 * Library of helper methods for SellerProduct on the server side
 */
// const SellerProductHelper = {
/* fetchCalendarData: async () => {
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
	}, */
// };

export async function fetchCalendarData() {}

export async function sellerOwnsProduct(
	userId: User['_id'],
	productId: Product['_id']
): Promise<boolean> {
	const ownsProduct = await prisma.sellerProduct.count({
		where: {
			id: productId,
			userId: userId,
		},
	});

	return ownsProduct >= 1;
}
// export default SellerProductHelper;
