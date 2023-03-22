import prisma from '../../../lib/prisma';
import Order from '../../../types/Order';
import User from '../../../types/User';

export async function sellerOwnsOrder(
	userId: User['id'],
	orderId: Order['id']
): Promise<boolean> {
	const ownsProduct = await prisma.order.count({
		where: {
			id: orderId,
			storeId: userId,
		},
	});

	return ownsProduct >= 1;
}
