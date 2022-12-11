import axios from 'axios';
import User from '../types/User';

const userHelper = {
	async sendMessageToUser(user: User, message: string, product?: string) {
		const { data } = await axios.post(`/api/users/messages`, {
			sentTo: user._id,
			message,
			product,
		});

		return data;
	},
};

export default userHelper;
