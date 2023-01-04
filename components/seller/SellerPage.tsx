import { Card, List, ListItem, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import useStyles from '../../utils/styles';
import Loading from '../Loading';
import LoadingPage from '../pages/LoadingPage';
import SellerContainer from './SellerContainer';

/**
 * @todo Implement for all files in /pages/seller/
 */
function SellerPage({
	title,
	children,
}: {
	title: String;
	children: ReactNode;
}) {
	const { data: session, status } = useSession({
		required: true,
	});

	const classes = useStyles();

	return status ? (
		<SellerContainer title={title}>
			<Card className={classes.section}>
				<List>
					<ListItem>
						<Typography
							component="h1"
							variant="h1"
							className="flex-auto"
						>
							{title}
						</Typography>
						<Button variant="outlined" color="primary">
							<Link href="/seller/sales" passHref>
								Back to Orders
							</Link>
						</Button>
					</ListItem>
				</List>
			</Card>
			{children}
		</SellerContainer>
	) : (
		<Loading />
	);
}

SellerPage.auth = {
	role: 'seller',
	loading: <LoadingPage />,
	unauthorized: '/',
};

export default SellerPage;
