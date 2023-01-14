import React from 'react';
import { useRouter } from 'next/router';
import { getTopItems } from '../../lib/items';
import Layout from '../../components/layout/Layout';
import Item from '../../components/products/Item';
import db from '../../utils/db';
import SellerProduct from '../../models/SellerProduct';
import Rental from '../../models/Rental';
import BlockOut from '../../models/BlockOut';
import ProductImage from '../../models/ProductImage';
import NotFound from '../../components/pages/NotFound';
import { Typography } from '@material-ui/core';

export default function ProductPage(props) {
	const { product } = props;

	if (!product) {
		return (
			<NotFound>
				<Typography component={'h1'} variant={'h1'}>
					Product Not Found
				</Typography>
			</NotFound>
		);
	}

	return (
		<Layout title={product.title} description={product.description}>
			<Item product={product} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;

	await db.connect();

	const product = await SellerProduct.findOne({ slug: slug })
		.populate([
			{
				path: 'images',
				model: ProductImage,
			},
			{
				path: 'rentals',
				model: Rental,
			},
			{
				path: 'blockOuts',
				match: { softDelete: { $ne: true } }, // Filter the softDeletes from view
				model: BlockOut,
			},
		])
		.lean();
	await db.disconnect();

	console.log(slug, product);

	return {
		props: {
			product: JSON.parse(JSON.stringify(product)),
		},
	};
}
