import { GetServerSideProps } from 'next';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import OrderType from '../../../types/Order';
import Layout from '../../../components/layout/Layout';
import { Children, Fragment } from 'react';
import { Typography } from '@material-ui/core';

export default function Sale({ sale }: { sale: OrderType }) {
	console.log('got props:', sale);

	return (
		<Layout title={sale._id}>
			<Typography component={'h1'} variant={'h1'}>
				Test
			</Typography>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;
	const { id } = params;

	await db.connect();

	const sale: OrderType = await Order.findById(id).lean(); //.exec();

	console.log('sale:', sale);

	await db.disconnect();

	return {
		props: {
			sale: JSON.parse(JSON.stringify(sale)),
		},
	};
};
