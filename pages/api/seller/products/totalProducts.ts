import { addDays } from 'date-fns';
import nc from 'next-connect';
import Order from '../../../../models/Order';
import SellerProduct from '../../../../models/SellerProduct';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';
import { isSeller } from '../../../../utils/isSeller';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		await db.connect();

		// @todo TS error
		// @ts-ignore
		const products = await SellerProduct.find({
			user: req.user._id,
			softDelete: { $ne: true },
		}).lean();

		await db.disconnect();

		res.send(products.length);
	} catch (error) {
		await db.disconnect();

		console.log('err', error);
		res.status(404).send({ message: 'access denied' });
	}
});

export default handler;
