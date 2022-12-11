import nc from 'next-connect';
import { onError } from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import UserMessage from '../../../../models/UserMessage';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
	try {
		await db.connect();

		console.log('GOT REQ', req.body, req.user);

		const userMessage = new UserMessage({
			sentBy: req.user._id,
			sentTo: req.body.sentTo,
			message: req.body.message,
			product: req.body.product,
		});

		await userMessage.save();

		await db.disconnect();

		res.status(201).send();
	} catch (error) {
		await db.disconnect();

		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
