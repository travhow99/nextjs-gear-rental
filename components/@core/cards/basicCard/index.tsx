import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

interface BasicCardProps {
	headerText?: string;
	content: string | React.ReactNode;
	mediaURL?: string;
}

export default function BasicCard(props: BasicCardProps) {
	const { headerText, content, mediaURL } = props;

	return (
		<Card /* sx={{ width: '100%' }} */>
			{mediaURL ? (
				<CardMedia sx={{ height: '14.5625rem' }} image={mediaURL} />
			) : null}
			<CardContent>
				{headerText ? (
					<Typography
						variant="h6"
						align="center"
						sx={{ marginBottom: 2 }}
					>
						{headerText}
					</Typography>
				) : null}
				{typeof content === 'string' ? (
					<Typography variant="h4" align="center">
						{content}
					</Typography>
				) : (
					<div>{content}</div>
				)}
			</CardContent>
		</Card>
	);
}
