import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';

import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';
import Rental from '../../../models/Rental';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		await db.connect();

		const filter = {
			user_id: req.user.id,
		};

		if (req.body.product) filter.product = req.body.product;

		const rentals = await Rental.find(filter);

		await db.disconnect();

		res.status(200).send(rentals);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

handler.post(async (req, res) => {
	try {
		await db.connect();

		const rental = new Rental({
			user_id: req.user.id,
			...req.body,
		});

		console.log(rental);

		const newRental = await rental.save();

		const sellerProduct = await SellerProduct.findById(req.body.product);
		sellerProduct.rentals.push(rental);

		await sellerProduct.save();

		await db.disconnect();

		res.status(201).send(newRental);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
