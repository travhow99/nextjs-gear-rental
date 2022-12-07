import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
	NavigationCardProps,
	NavigationCardTab,
} from '../../../../types/NavigationCard';
import { Tab } from '@material-ui/core';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function NavigationCard(props: NavigationCardProps) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="navigation tabs"
				>
					{props.tabs.map((tab: NavigationCardTab, index: number) => (
						<Tab
							key={index}
							label={tab.title || `Item ${index}`}
							{...a11yProps(index)}
						/>
					))}
				</Tabs>
			</Box>
			{props.tabs.map((tab: NavigationCardTab, index: number) => (
				<TabPanel key={index} value={value} index={index}>
					{tab.title && (
						<Typography variant="h6" sx={{ marginBottom: 2 }}>
							{tab.title}
						</Typography>
					)}
					<Box sx={{ marginBottom: 4 }}>{tab.content}</Box>
					{/**
					 * @todo handle tab.action (click, Link, etc.)
					 */}
				</TabPanel>
			))}
		</Box>
	);
}
