import React from 'react';
import { useRouter } from 'next/router';
import { getTopItems } from '../../lib/items';
import Layout from '../../components/layout/Layout';
import Item from '../../components/products/Item';
import NotFound from '../../components/pages/NotFound';
import { Typography } from '@material-ui/core';
import prisma from '../../lib/prisma';

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

	const product = await prisma.sellerProduct.findFirst({
		where: {
			slug: slug,
		},
		include: {
			images: true,
			rentals: true,
			blockOuts: {
				where: {
					NOT: {
						softDelete: true,
					},
				},
			},
		},
	});

	/* await db.connect();

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

	console.log(slug, product); */

	return {
		props: {
			product: JSON.parse(JSON.stringify(product)),
		},
	};
}
