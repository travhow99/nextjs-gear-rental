import prisma from '../../../lib/prisma';
import User from '../../../types/User';
import SellerProduct from '../../../types/SellerProduct';

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
	userId: User['id'],
	productId: SellerProduct['id']
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
