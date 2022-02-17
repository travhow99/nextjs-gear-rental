/**
 * @todo Show Product & allow editing
 * Photo upload
 */

import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import LoadingPage from '../../../components/pages/LoadingPage';
import SellerContainer from '../../../components/seller/SellerContainer';
import useApi from '../../../utils/hooks/useApi';
import useStyles from '../../../utils/styles';

const getProduct = (id) => axios.get(`/api/sellerProducts/${id}`);

function SellerProduct({ params }) {
  const sellerProductId = params.id;
  //   const [sellerProduct, setSellerProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSellerProductApi = useApi(getProduct);

  const classes = useStyles();

  const { data: session, status } = useSession({
    required: true,
  });

  useEffect(() => {
    setLoading(true);
    fetchSellerProduct();
  }, [sellerProduct]);

  const fetchSellerProduct = async () => {
    try {
      await getSellerProductApi.request(sellerProductId);

      setLoading(false);
    } catch (err) {
      console.log('got err!', err);
    }
  };

  const sellerProduct = getSellerProductApi.data;

  return status ? (
    <SellerContainer>
      <Card className={classes.section}>
        {sellerProduct ? (
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {sellerProduct.title}
              </Typography>
            </ListItem>
            <ListItem>
              {sellerProduct.images?.length ? (
                sellerProduct.map((product) => (
                  <Grid item xs={4}>
                    'image
                  </Grid>
                ))
              ) : (
                <>
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      color="primary"
                    >
                      <input
                        accept="image/*"
                        className={classes.input}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                      />
                      Upload
                    </Button>
                  </label>
                </>
              )}
            </ListItem>
            <ListItem>
              <Typography component="p">{sellerProduct.stock}</Typography>
            </ListItem>
          </List>
        ) : (
          <CircularProgress />
        )}
      </Card>
    </SellerContainer>
  ) : (
    <Loading />
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

SellerProduct.auth = {
  role: 'seller',
  loading: <LoadingPage />,
  unauthorized: '/',
};

export default SellerProduct;
