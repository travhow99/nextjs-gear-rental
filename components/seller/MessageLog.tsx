import {
	Card,
	CardContent,
	CircularProgress,
	List,
	ListItem,
	Typography,
} from '@mui/material';
import UserMessage from '../../types/UserMessage';
import useUserMessages from '../../utils/hooks/useUserMessages';
import OutgoingMessage from '../@core/listItems/messages/OutgoingMessage';
import UserContactForm from '../utilities/dialogs/UserContactForm';

export default function MessageLog({ saleId, user }) {
	const { messages, isLoading, isError, mutate } = useUserMessages(saleId);

	console.log(messages, isLoading, isError);

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
							<List
								sx={{
									width: '100%',
									// maxWidth: 360,
									bgcolor: 'background.paper',
								}}
							>
								{messages.map((message: UserMessage) =>
									message.sentBy ? (
										<OutgoingMessage
											// @ts-ignore
											key={message._id}
											message={message}
											user={user}
										/>
									) : (
										<OutgoingMessage
											// @ts-ignore
											key={message._id}
											message={message}
											user={user}
										/>
									)
								)}
							</List>
							{/**
							 * @todo Send message textarea component
							 */}
						</>
					) : (
						<UserContactForm user={user} />
					)}
				</CardContent>
			)}
		</Card>
	);
}
