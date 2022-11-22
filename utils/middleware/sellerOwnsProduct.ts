import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../types/User';
import SellerHelper from '../seller/SellerHelper';

interface NextApiRequestWithUser extends NextApiRequest {
	user: User;
}

const sellerOwnsProduct = async (
	req: NextApiRequestWithUser,
	res: NextApiResponse,
	next: Function
) => {
	console.log('sowns p', req.user);

	const ownsProduct = await SellerHelper.sellerOwnsProduct(
		req.user._id,
		req.query.id
	);

	if (ownsProduct) {
		// req.user = session.user;
		next();
	} else {
		res.status(401).send({ message: "You don't belong here!" });
	}
};

export { sellerOwnsProduct };
