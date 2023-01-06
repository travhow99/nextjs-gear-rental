import { List } from '@mui/material';
import { useEffect, useRef } from 'react';
import User from '../../../../types/User';
import UserMessage from '../../../../types/UserMessage';
import IncomingMessage from '../../../@core/listItems/messages/IncomingMessage';
import MessageItem from '../../../@core/listItems/messages/MessageItem';
import OutgoingMessage from '../../../@core/listItems/messages/OutgoingMessage';

export default function MessageThread({
	messages,
	user,
}: {
	messages: Array<UserMessage>;
	user: User;
}) {
	return (
		<List
			sx={{
				width: '100%',
				// maxWidth: 360,
				bgcolor: 'background.paper',
				maxHeight: 320,
				overflowY: 'auto',
			}}
		>
			{messages.map((message: UserMessage, index: number) => (
				<MessageItem
					// @ts-ignore
					key={message._id}
					message={message}
					user={user}
					previousMessage={messages[index - 1]?.createdAt}
					type={message.sentBy ? 'outgoing' : 'incoming'}
				/>
			))}

			{/* <AlwaysScrollToBottom /> */}
		</List>
	);
}

/**
 * @todo Scrolling to bottom on re-focus, should only on initial render
 */
const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	// useEffect(() => elementRef?.current?.scrollIntoView());
	return <div ref={elementRef} />;
};
