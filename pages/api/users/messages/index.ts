import nc from 'next-connect';
import { onError } from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import UserMessage from '../../../../models/UserMessage';
import sendEmail from '../../../../utils/mailer';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
	try {
		await db.connect();

		// @todo TS error
		// @ts-ignore
		/* const messages = await UserMessage.find({
			$and: [
				{ rental: req.body.rental },
				{ $or: [{ sentBy: req.user._id }, { sentTo: req.user._id }] },
			],
		}); */

		await db.disconnect();

		res.send([]);
	} catch (error) {
		await db.disconnect();

		console.log('err', error);
		res.status(404).send({ message: 'messages not found' });
	}
});

handler.post(async (req, res) => {
	try {
		await db.connect();

		const userMessage = new UserMessage({
			sentBy: req.user._id,
			sentTo: req.body.sentTo,
			message: req.body.message,
			product: req.body.product,
			rental: req.body.rental,
		});

		await userMessage.save();

		await db.disconnect();

		res.status(201).send();

		await sendEmail({ text: req.body.message });
	} catch (error) {
		await db.disconnect();

		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
