import Head from "next/head";
import Layout, { siteTitle } from "../components/layout/layout";
// import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import itemList from "../components/products/seed";
import Item from "../components/products/item";
import { getTopItems } from "../lib/items";
import { Box, SimpleGrid } from "@chakra-ui/layout";

export async function getStaticProps() {
  const topItems = getTopItems();
  return {
    props: {
      topItems,
    },
  };
}
/**
 * @todo getstaticprops items
 */
export default function Home({ topItems }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box m={4} className={utilStyles.headingMd}>
        <SimpleGrid columns={3} spacing={10}>
          {topItems.map((item, index) => (
            <Item item={item} key={index} />
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
}
