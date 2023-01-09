import nc from 'next-connect';
import { onError } from '../../../../../utils/error';
import { isAuth } from '../../../../../utils/auth';
import db from '../../../../../utils/db';
import UserMessage from '../../../../../models/UserMessage';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
	try {
		await db.connect();
		console.log(req);
		// @todo TS error
		// @ts-ignore
		const messages = await UserMessage.find({
			$and: [
				{ rental: req.query.id },
				{ $or: [{ sentBy: req.user._id }, { sentTo: req.user._id }] },
			],
		}).exec();

		console.log('got messages for ', req.query.id, messages);

		await db.disconnect();

		res.send(messages);
	} catch (error) {
		await db.disconnect();

		console.log('err', error);
		res.status(404).send({ message: 'messages not found' });
	}
});

export default handler;
