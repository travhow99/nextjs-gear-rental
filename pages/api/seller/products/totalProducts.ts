import { NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '../../../../lib/prisma';
import NextApiRequestWithUser from '../../../../types/api/NextApiRequestWithUser';
import { onError } from '../../../../utils/error';
import { isSeller } from '../../../../utils/isSeller';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const productCount = await prisma.sellerProduct.count({
			where: {
				userId: req.user.id,
				OR: [{ softDelete: false }, { softDelete: null }],
			},
		});

		res.send(productCount);
	} catch (error) {
		res.status(404).send({ message: 'access denied' });
	}
});

export default handler;
