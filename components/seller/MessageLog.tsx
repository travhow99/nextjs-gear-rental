import {
	Card,
	CardContent,
	CircularProgress,
	List,
	ListItem,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import User from '../../types/User';
import useUserMessages from '../../utils/hooks/useUserMessages';
import userHelper from '../../utils/userHelper';
import MessageInput from '../@core/listItems/messages/MessageInput';
import UserContactForm from '../utilities/dialogs/UserContactForm';
import MessageThread from './widgets/messageThread';

export default function MessageLog({
	saleId,
	user,
}: {
	saleId: string;
	user: User;
}) {
	const { messages, isLoading, isError, isValidating, mutate } =
		useUserMessages(saleId);

	const [isSending, setIsSending] = useState(false);

	const handleSend = async (value: string) => {
		console.log(value);

		setIsSending(true);

		await userHelper.sendMessageToUser(user, value, null, saleId);

		setIsSending(false);

		mutate();
	};

	return (
		<Card>
			{isLoading ? (
				<CircularProgress />
			) : (
				<CardContent>
					{messages.length ? (
						<>
							<Typography variant="h5">
								Messages from {user.name}
							</Typography>
							<MessageThread messages={messages} user={user} />

							<MessageInput
								hasSendButton={true}
								onSend={handleSend}
								isSending={isSending}
							/>
						</>
					) : (
						<UserContactForm
							user={user}
							reRender={mutate}
							rentalId={saleId}
						/>
					)}
				</CardContent>
			)}
		</Card>
	);
}
