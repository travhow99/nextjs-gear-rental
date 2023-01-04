import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import User from '../../../../types/User';
import UserMessage from '../../../../types/UserMessage';

export default function IncomingMessage({
	message,
	user,
}: {
	message: UserMessage;
	user: User;
}): JSX.Element {
	console.log('got msg', message, user);
	return (
		<ListItem /* sx={{ justifyContent: 'flex-end' }} */>
			<ListItemAvatar>
				{/**
				 * @todo User Avatar component
				 */}
				<Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
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
							{user.name}
						</Typography>
						{" — I'll be in your neighborhood doing errands this…"}
					</>
				}
			/>
		</ListItem>
	);
}
