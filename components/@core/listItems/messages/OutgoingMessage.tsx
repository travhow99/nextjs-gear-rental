import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListSubheader,
	Typography,
} from '@mui/material';
import User from '../../../../types/User';
import UserMessage from '../../../../types/UserMessage';
import dateHelper from '../../../../utils/dateHelper';

export default function OutgoingMessage({
	message,
	user,
}: {
	message: UserMessage;
	user: User;
}): JSX.Element {
	console.log('got msg', message, user);
	return (
		<>
			<ListSubheader className="text-center">
				{/**
				 * @todo Better helper method for showing past messages, ie. Tuesday - 6:00 PM, (today) 4:00 PM, Sunday, Dec 25 - 4:30 PM
				 * Use google messages for reference
				 */}
				{dateHelper.timestampToDateTime(message.createdAt)}
			</ListSubheader>
			<ListItem sx={{ justifyContent: 'flex-end' }}>
				<ListItemAvatar>
					{/**
					 * @todo User Avatar component
					 */}
					<Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
				</ListItemAvatar>
				<ListItemText primary={message.message} />
			</ListItem>
		</>
	);
}
