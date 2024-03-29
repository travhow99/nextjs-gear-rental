import { List } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import User from '../../../../types/User';
import UserMessage from '../../../../types/UserMessage';
import MessageItem from '../../../@core/listItems/messages/MessageItem';

export default function MessageThread({
	messages,
	user,
}: {
	messages: Array<UserMessage>;
	user: User;
}) {
	const { data: session, status } = useSession({ required: true });

	const scrollRef = useRef(null);

	useEffect(() => {
		scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	});

	return (
		<List
			sx={{
				width: '100%',
				// maxWidth: 360,
				bgcolor: 'background.paper',
				maxHeight: 320,
				overflowY: 'auto',
			}}
			ref={scrollRef}
		>
			{messages.map((message: UserMessage, index: number) => (
				<MessageItem
					// @ts-ignore
					key={message._id}
					message={message}
					user={user}
					previousMessage={messages[index - 1]?.createdAt}
					/**
					 * @todo Update next-auth session.user type to include _id
					 */
					type={
						// @ts-ignore
						message.sentBy === session.user._id
							? 'outgoing'
							: 'incoming'
					}
				/>
			))}
		</List>
	);
}
