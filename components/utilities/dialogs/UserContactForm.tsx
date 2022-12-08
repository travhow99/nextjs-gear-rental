import User from '../../../types/User';
import FormModal from '../../@core/modals/formModal';
import { useSnackbar } from 'notistack';

interface UserContactFormProps {
	children?: React.ReactNode;
	user: User;
}

export default function UserContactForm(props: UserContactFormProps) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleSubmit = (textValue: string) => {
		console.log('my fake handleSubmit', textValue);

		enqueueSnackbar('Message Sent!', {
			variant: 'success',
		});
	};

	return (
		<FormModal
			openText={`Contact ${props.user.name}`}
			openTextVariant={'text'}
			dialogTitle={`Contact ${props.user.name}`}
			dialogContentText={`Please send your message to ${props.user.name} below. Your message will be securely sent.`}
			closeText={'Cancel'}
			submitText={'Send Message'}
			textFieldLabel={'Your Message'}
			textFieldType={'text'}
			multilineTextField={true}
			onSubmit={handleSubmit}
		/>
	);
}
