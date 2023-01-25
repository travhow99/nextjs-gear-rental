import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import DataCard from '.';

//👇 This default export determines where your story goes in the story list
export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'DataCard',
	component: DataCard,
} as ComponentMeta<typeof DataCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof DataCard> = (args) => (
	<DataCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
	headerText: 'Total Products',
	content: 0,
	fetchedData: false,
};

export const Standard = Template.bind({});

Standard.args = {
	/*👇 The args you need here will depend on your component */
	headerText: 'Total Products',
	content: 'Only $4.99/month',
	fetchedData: true,
};

export const Media = Template.bind({});

Media.args = {
	/*👇 The args you need here will depend on your component */
	headerText: 'Join Now',
	content: 'Only $4.99/month',
	mediaURL:
		'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png',
	fetchedData: true,
};
