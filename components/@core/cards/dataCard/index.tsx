import { Card, CircularProgress, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BasicCardProps } from '../../../../types/BasicCard';
import BasicCard from '../basicCard';

export default function DataCard(props: BasicCardProps) {
	const { headerText, content, mediaURL, fetchedData } = props;

	return fetchedData ? (
		<BasicCard
			headerText={headerText}
			content={content}
			mediaURL={mediaURL}
		/>
	) : (
		<Card sx={{ height: '100%', padding: 2 }}>
			<Typography
				variant="h6"
				align="center" /* sx={{ marginBottom: 2 }} */
			>
				{headerText}
			</Typography>
			{/* <Skeleton variant="rectangular" height={'calc(100% - 2rem)'} /> */}
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		</Card>
	);
}
