import Layout from '../components/layout/Layout';
// import { getSortedPostsData } from "../lib/posts";
import HomeCallToAction from '../components/layout/Home';
import db from '../utils/db';
import Product from '../models/Product';

export default function Home({ products }) {
  return (
    <Layout home>
      <HomeCallToAction topItems={products} />
      {/* <Box m={4} className={utilStyles.headingMd}>
        <SimpleGrid columns={3} spacing={10}>
          {topItems.map((item, index) => (
            <Item item={item} key={index} />
          ))}
        </SimpleGrid>
      </Box> */}
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const products = await Product.find({}).lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
