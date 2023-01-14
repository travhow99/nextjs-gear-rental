import React from 'react';

export interface NavigationCardTab {
	title?: string;
	content: string | React.ReactNode;
	actionText?: string;
	action?: Function;
}

export interface NavigationCardProps {
	tabs: Array<NavigationCardTab>;
}
