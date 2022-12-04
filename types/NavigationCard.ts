export interface NavigationCardTab {
	title?: string;
	text: string;
	actionText?: string;
	action?: Function;
}

export interface NavigationCardProps {
	tabs: Array<NavigationCardTab>;
}
