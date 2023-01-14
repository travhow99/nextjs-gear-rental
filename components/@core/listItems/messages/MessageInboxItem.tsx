import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import User from '../../../../types/User';
import UserMessage from '../../../../types/UserMessage';

export default function MessageInboxItem({
	message,
	user,
}: {
	message: UserMessage;
	user: User;
}): JSX.Element {
	console.log('got msg', message);
	return (
		<ListItem sx={{ justifyContent: 'flex-end' }}>
			<ListItemAvatar>
				<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
			</ListItemAvatar>
			<ListItemText
				primary="Brunch this weekend?"
				secondary={
					<>
						<Typography
							sx={{ display: 'inline' }}
							component="span"
							variant="body2"
							color="text.primary"
						>
							Ali Connors
						</Typography>
						{" — I'll be in your neighborhood doing errands this…"}
					</>
				}
			/>
			{message.message}
		</ListItem>
	);
}
