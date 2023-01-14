import axios from 'axios';
import User from '../types/User';

const userHelper = {
	/**
	 * @todo notify user via email/websocket
	 */
	async sendMessageToUser(
		user: User,
		message: string,
		product?: string,
		rental?: string
	) {
		const { data } = await axios.post(`/api/users/messages`, {
			sentTo: user._id,
			message,
			product,
			rental,
		});

		return data;
	},
};

export default userHelper;
