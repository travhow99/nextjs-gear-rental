import { makeStyles } from '@material-ui/styles';

const secondary = '#859fb9';

/**
 * Add classes here.
 */
const useStyles = makeStyles({
	navbar: {
		backgroundColor: '#203040',
		'& a': {
			color: '#ffffff',
			marginLeft: 10,
		},
	},
	brand: {
		fontWeight: 'bold',
		fontSize: '1.5rem',
	},
	grow: {
		flexGrow: 1,
	},
	_404: {
		minHeight: '100vh',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: '#203040',
		color: '#ffffff',
	},
	main: {
		minHeight: '80vh',
	},
	footer: {
		marginTop: 10,
		textAlign: 'center',
	},
	section: {
		marginTop: 10,
		marginBottom: 10,
	},
	navbarButton: {
		color: '#ffffff',
		textTransform: 'initial',
	},
	transparentBackground: {
		backgroundColor: 'transparent',
	},
	error: {
		color: '#f04040',
	},
	fullWidth: {
		width: '100%',
	},
	form: {
		width: '100%',
		maxWidth: 800,
		margin: '0 auto',
	},
	paper: {
		width: '100%',
		textAlign: 'center',
		height: 60,
		lineHeight: '60px',
		cursor: 'pointer',
	},
	primary: {
		backgroundColor: '#203040',
	},
	bgSecondary: {
		backgroundColor: secondary,
	},
	textWhite: {
		color: '#ffffff',
	},
});

export default useStyles;
