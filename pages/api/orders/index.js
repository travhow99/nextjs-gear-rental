import nc from 'next-connect';
import Order from '../../../models/Order';
import Rental from '../../../models/Rental';
import SellerProduct from '../../../models/SellerProduct';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
	try {
		await db.connect();

		console.log('got request', req.body);
		const rentals = req.body.orderItems.map((rental) => {
			rental.product = rental._id;
			delete rental._id;
			delete rental.createdAt;
			delete rental.updatedAt;
			return rental;
		});

		console.log('r:', rentals);

		// Add the Rentals to the db
		const result = await Rental.insertMany(rentals);

		console.log('got insertedids', result);

		const newOrder = new Order({
			...req.body,
			user: req.user._id,
			rentals: result.map((rental) => rental._id),
		});
		console.log('store new order', newOrder);
		const order = await newOrder.save();

		// Store rentals to SellerProduct
		/**
		 * @todo need to add rentals to SellerProduct
		 */
		/* rentals.forEach((rental) => {
      const sellerProduct = SellerProduct.findById(rental.product);

      sellerProduct.rentals.push(rental);

      await sellerProduct.save();
    }); */

		await db.disconnect();

		res.status(201).send(order);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
