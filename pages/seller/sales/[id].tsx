import { GetServerSideProps } from 'next';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import OrderType from '../../../types/Order';
import Layout from '../../../components/layout/Layout';
import { Children, Fragment, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import NotFound from '../../../components/pages/NotFound';
import Sale from '../../../components/seller/Sale';
import SellerContainer from '../../../components/seller/SellerContainer';
import SellerPage from '../../../components/seller/SellerPage';
import Rental from '../../../models/Rental';
import ProductImage from '../../../models/ProductImage';
import SellerProduct from '../../../models/SellerProduct';
import User from '../../../models/User';

/**
 * @todo Pass to swr or remove SSR
 */
function SalePage({ sale }: { sale: OrderType }) {
	console.log('got props:', sale);

	const pageTitle = `Order #${sale._id}`;

	if (!sale) {
		return (
			<NotFound title={pageTitle}>
				<Typography component={'h1'} variant={'h1'}>
					Product Not Found
				</Typography>
			</NotFound>
		);
	}

	return (
		<SellerPage title={pageTitle}>
			<Sale saleId={sale._id} />
		</SellerPage>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;
	const { id } = params;

	await db.connect();

	/**
	 * @todo Resolve with mongoose or migrate to Prisma?
	 */
	// @ts-ignore
	const sale: OrderType = await Order.findById(id)
		.populate([
			{
				path: 'rentals',
				model: Rental,
				populate: {
					path: 'product',
					model: SellerProduct,
					populate: {
						path: 'images',
						model: ProductImage,
					},
				},
			},
			{
				path: 'user',
				model: User,
				select: 'name email',
			},
		])
		.lean(); //.exec();

	console.log('sale:', sale);

	await db.disconnect();

	return {
		props: {
			sale: JSON.parse(JSON.stringify(sale)),
		},
	};
};

SalePage.auth = SellerPage.auth;

export default SalePage;
