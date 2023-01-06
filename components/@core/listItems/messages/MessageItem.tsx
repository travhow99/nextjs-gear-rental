import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListSubheader,
	Typography,
} from '@mui/material';
import { differenceInMinutes } from 'date-fns';
import User from '../../../../types/User';
import UserMessage from '../../../../types/UserMessage';
import dateHelper from '../../../../utils/dateHelper';

export default function MessageItem({
	message,
	user,
	previousMessage,
	type,
}: {
	message: UserMessage;
	user: User;
	previousMessage: string;
	type: 'outgoing' | 'incoming';
}): JSX.Element {
	const diffInMinutes = differenceInMinutes(
		new Date(message.createdAt),
		new Date(previousMessage)
	);

	return (
		<>
			{!previousMessage || diffInMinutes >= 3 ? (
				<ListSubheader className="text-center" disableSticky>
					{dateHelper.toReadableTime(message.createdAt)}
				</ListSubheader>
			) : null}
			<ListItem
				className={type === 'outgoing' ? 'ml-auto' : ''}
				sx={{ width: '45%' }}
			>
				<ListItemAvatar>
					{/**
					 * @todo User Avatar component
					 */}
					<Avatar
						alt={user.name} /* src="/static/images/avatar/1.jpg" */
					/>
				</ListItemAvatar>
				<ListItemText primary={message.message} />
			</ListItem>
		</>
	);
}
