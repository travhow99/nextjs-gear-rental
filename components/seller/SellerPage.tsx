import { Card, List, ListItem, Typography } from '@material-ui/core';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import useStyles from '../../utils/styles';
import Loading from '../Loading';
import LoadingPage from '../pages/LoadingPage';
import SellerContainer from './SellerContainer';

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
						<Typography component="h1" variant="h1">
							{title}
						</Typography>
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
