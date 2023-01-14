import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	createTheme,
	ThemeProvider,
	CssBaseline,
} from '@material-ui/core';
import Header from './Header';
import useStyles from '../../utils/styles';
import { ReactNode } from 'react';

type LayoutProps = {
	title: string;
	description?: string;
	children: ReactNode;
	// home: boolean
};

export default function Layout({
	title,
	description,
	children /* , home */,
}: LayoutProps) {
	const classes = useStyles();
	const baseTitle = 'Adventure Buddy';
	const siteTitle = title ? title + ' - ' + baseTitle : baseTitle;

	/**
	 * @todo implement in redux theme store
	 */
	/* const darkModeChangeHandler = () => {
		/* dispatch({
      type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON',
    }); 

		const newDarkMode = !darkMode;
		console.log('set darkMode to ', newDarkMode);
		Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
	}; */

	const theme = createTheme({
		typography: {
			h1: {
				fontSize: '1.6rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
			h2: {
				fontSize: '1.4rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
			h3: {
				fontSize: '1.2rem',
				fontWeight: 400,
				margin: '.5rem 0',
			},
			h4: {
				fontSize: '1rem',
				fontWeight: 400,
				margin: '.5rem 0',
			},
		},
		/* palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
      error: {
        main: '#f44336',
      },
      warning: {
        main: '#ffa726',
      },
    }, */
	});

	return (
		<div>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Gear rental from your friendly neighbors"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
				<title>{siteTitle}</title>
				{description && (
					<meta name="description" content={description}></meta>
				)}
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Container className={classes.main}>{children}</Container>
				<footer className={classes.footer}>
					<Typography>
						All rights reserved. adventurebuddy.
					</Typography>
				</footer>
			</ThemeProvider>
		</div>
	);
}
