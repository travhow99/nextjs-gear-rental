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
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import LoadingPage from '../../../components/pages/LoadingPage';
import SellerContainer from '../../../components/seller/SellerContainer';

import useStyles from '../../../utils/styles';

function SellerProduct({ params }) {
  const sellerProductId = params.id;

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState(false);
  const [stock, setStock] = useState(false);
  const [rentalMin, setRentalMin] = useState(false);
  const [title, setTitle] = useState(false);
  const [brand, setBrand] = useState(false);
  const [gender, setGender] = useState(false);
  const [size, setSize] = useState(false);
  const [condition, setCondition] = useState(false);
  const [price, setPrice] = useState(false);
  const [description, setDescription] = useState(false);
  const [keyword, setKeyword] = useState(false);
  const [images, setImages] = useState(false);

  const classes = useStyles();

  const { data: session, status } = useSession({
    required: true,
  });

  useEffect(() => {
    setLoading(true);
    fetchSellerProduct();
  }, []);

  const fetchSellerProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/sellerProducts/${sellerProductId}`
      );

      console.log('got data', data);

      setCategory(data.category);
      setStock(data.stock);
      setRentalMin(data.rental_min);
      setTitle(data.title);
      setBrand(data.brand);
      setGender(data.gender);
      setSize(data.size);
      setCondition(data.condition);
      setPrice(data.price);
      setDescription(data.description);
      setKeyword(data.keyword);
      setImages(data.images);

      setLoading(false);
    } catch (err) {
      console.log('got err!', err);
    }
  };

  const sellerProduct = null;
  return status ? (
    <SellerContainer>
      <Card className={classes.section}>
        {title ? (
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {title}
              </Typography>
            </ListItem>
            <ListItem>
              {images?.length &&
                images.map((product) => (
                  <Grid item xs={4}>
                    'images
                  </Grid>
                ))}

              {/* @todo implement AWS / Cloudflare upload process */}
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden />
              </Button>
            </ListItem>
            <ListItem>
              <TextField
                id="stock"
                label="Stock"
                value={stock}
                type={'number'}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <Typography component="label">Category:&nbsp;</Typography>
              <Typography component="p">{category}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Rental Min:&nbsp;</Typography>
              <Typography component="p">{rentalMin}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Title:&nbsp;</Typography>
              <Typography component="p">{title}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Brand:&nbsp;</Typography>
              <Typography component="p">{brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Gender:&nbsp;</Typography>
              <Typography component="p">{gender}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Size:&nbsp;</Typography>
              <Typography component="p">{size}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Condition:&nbsp;</Typography>
              <Typography component="p">{condition}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Price:&nbsp;</Typography>
              <Typography component="p">{price}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Description:&nbsp;</Typography>
              <Typography component="p">{description}</Typography>
            </ListItem>
            <ListItem>
              <Typography component="label">Keyword:&nbsp;</Typography>
              <Typography component="p">{keyword}</Typography>
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
