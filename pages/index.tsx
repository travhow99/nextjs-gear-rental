import Layout from '../components/layout/Layout';
// import { getSortedPostsData } from "../lib/posts";
import HomeCallToAction from '../components/layout/Home';
import db from '../utils/db';
import SellerProduct from '../models/SellerProduct';
import ProductImage from '../models/ProductImage';
import prisma from '../lib/prisma';

export default function Home({ products }) {
	return (
		<Layout title="Adventure Buddy">
			<HomeCallToAction topItems={products} />
		</Layout>
	);
}

export async function getServerSideProps() {
	const products = await prisma.sellerProduct.findMany({
		where: {
			OR: [
				{
					softDelete: false,
				},
				{
					softDelete: {
						isSet: false,
					},
				},
			],
		},
		include: {
			images: true,
		},
	});

	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
		},
	};
}
