import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

interface MessageInputProps {
	hasSendButton: boolean;
	isSending?: boolean;
	onSend?: Function;
}

export default function MessageInput({
	hasSendButton = true,
	isSending = true,
	onSend = console.log,
}: MessageInputProps): JSX.Element {
	const [value, setValue] = useState('');

	return (
		<Grid container>
			<Grid item xs={hasSendButton ? 9 : 12} sm={hasSendButton ? 10 : 12}>
				<TextField
					fullWidth
					multiline
					maxRows={4}
					onChange={(e) => setValue(e.target.value)}
					value={value}
					size="small"
					placeholder="Enter your message..."
				/>
			</Grid>
			{hasSendButton ? (
				<Grid item xs={3} sm={2}>
					<Button
						fullWidth
						variant="contained"
						endIcon={<SendIcon />}
						className="h-full"
						onClick={() => {
							onSend(value);
							setValue('');
						}}
						disabled={!value.length || isSending}
					>
						Send
					</Button>
				</Grid>
			) : null}
		</Grid>
	);
}
