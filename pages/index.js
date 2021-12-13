import Head from 'next/head';
import Layout from '../components/layout/Layout';
// import { getSortedPostsData } from "../lib/posts";
import Link from 'next/link';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';
import itemList from '../components/products/seed';
import Item from '../components/products/item';
import { getTopItems } from '../lib/items';
import { Box, SimpleGrid } from '@chakra-ui/layout';
import HomeCallToAction from '../components/layout/Home';

export async function getStaticProps() {
  const topItems = getTopItems();
  return {
    props: {
      topItems,
    },
  };
}

export default function Home({ topItems }) {
  return (
    <Layout home>
      <HomeCallToAction topItems={topItems} />
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
