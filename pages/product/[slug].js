import React from 'react';
import { useRouter } from 'next/router';
import { getTopItems } from '../../lib/items';
import Layout from '../../components/layout/Layout';
import Item from '../../components/products/item';
import Product from '../../models/Product';
import db from '../../utils/db';

export default function ProductPage(props) {
  const { product } = props;

  if (!product) {
    return <div>Product Not Found</div>;
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

  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  console.log(slug, product);

  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
