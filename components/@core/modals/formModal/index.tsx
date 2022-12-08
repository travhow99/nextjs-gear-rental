import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FormModalProps {
	openText: string;
	openTextVariant?: 'text' | 'outlined' | 'contained';
	dialogTitle: string;
	dialogContentText?: string;
	closeText?: string;
	submitText?: string;
	textFieldLabel: string;
	textFieldType: React.InputHTMLAttributes<unknown>['type'];
	multilineTextField: boolean;
	onSubmit: Function;
}

export default function FormModal(props: FormModalProps) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (e?: {}, reason?: string) => {
		console.log('r reason:', reason);
		if (reason !== 'backdropClick') {
			setOpen(false);
		}
	};

	const handleSubmit = () => {
		if (value) {
			props.onSubmit(value);
		}

		setOpen(false);
	};

	return (
		<div>
			<Button
				variant={props.openTextVariant || 'outlined'}
				onClick={handleClickOpen}
			>
				{props.openText}
			</Button>
			<Dialog open={open} onClose={handleClose}>
				{props.dialogTitle && (
					<DialogTitle>{props.dialogTitle}</DialogTitle>
				)}
				<DialogContent>
					{props.dialogContentText && (
						<DialogContentText>
							{props.dialogContentText}
						</DialogContentText>
					)}
					<TextField
						autoFocus
						margin="dense"
						// id="name"
						label={props.textFieldLabel}
						type={props.textFieldType}
						fullWidth
						variant="standard"
						multiline={props.multilineTextField}
						minRows={props.multilineTextField ? 4 : 1}
						onBlur={(e) => {
							setValue(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						{props.closeText || 'Cancel'}
					</Button>
					<Button onClick={handleSubmit}>
						{props.submitText || 'Submit'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
