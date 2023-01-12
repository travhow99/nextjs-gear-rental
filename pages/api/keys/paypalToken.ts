import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
	try {
		const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

		res.send(
			Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString(
				'base64'
			)
		);
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'access denied' });
	}
});

export default handler;
