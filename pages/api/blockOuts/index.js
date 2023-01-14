import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';

import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';
import BlockOut from '../../../models/BlockOut';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		await db.connect();

		const filter = {
			user_id: req.user._id,
		};

		if (req.body.product) filter.product = req.body.product;

		const blockOuts = await BlockOut.find(filter);

		await db.disconnect();

		res.status(200).send(blockOuts);
	} catch (error) {
		await db.disconnect();

		res.status(400).json({ success: false, message: error.message });
	}
});

handler.post(async (req, res) => {
	try {
		await db.connect();

		const blockOut = new BlockOut({
			user_id: req.user._id,
			...req.body,
		});

		console.log(blockOut);

		const newBlockOut = await blockOut.save();

		const sellerProduct = await SellerProduct.findById(req.body.product);
		sellerProduct.blockOuts.push(blockOut);

		await sellerProduct.save();

		await db.disconnect();

		res.status(201).send(newBlockOut);
	} catch (error) {
		await db.disconnect();

		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
