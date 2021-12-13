import React from 'react';
import { useRouter } from 'next/router';
import { getTopItems } from '../../lib/items';
import Layout from '../../components/layout/Layout';
import Item from '../../components/products/item';

export default function ProductPage() {
  const topItems = getTopItems();
  const router = useRouter();
  const { slug } = router.query;
  const product = topItems.find((item) => item.slug === slug);

  console.log('slug page!');

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <Layout title={product.title} description={product.description}>
      <Item product={product} />
    </Layout>
  );
}
