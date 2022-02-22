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
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';
import LoadingPage from '../../../components/pages/LoadingPage';
import SellerContainer from '../../../components/seller/SellerContainer';
import {
  brandFail,
  brandRequest,
  brandSuccess,
} from '../../../redux/brand/brandSlice';
import {
  categoryFail,
  categoryRequest,
  categorySuccess,
} from '../../../redux/category/categorySlice';
import SellerHelper from '../../../utils/seller/SellerHelper';

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

  const dispatch = useDispatch();
  const {
    brand: { brands },
    category: { categories },
  } = useSelector((state) => state);

  const { data: session, status } = useSession({
    required: true,
  });

  useEffect(() => {
    setLoading(true);
    if (!brands.length) fetchBrands();
    if (!categories.length) fetchCategories();
    fetchSellerProduct();
  }, [brands, categories]);

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

  const fetchBrands = async () => {
    try {
      dispatch(brandRequest());

      const data = await SellerHelper.fetchBrands();
      console.log('got brands', data);

      dispatch(brandSuccess(data));
    } catch (error) {
      console.log('fetch error', error);

      dispatch(brandFail(error));
    }
  };

  const fetchCategories = async () => {
    try {
      dispatch(categoryRequest());

      const data = await SellerHelper.fetchCategories();
      console.log('got cats', data);

      dispatch(categorySuccess(data));
    } catch (error) {
      console.log('fetch error', error);

      dispatch(categoryFail(error));
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
                value={stock || ''}
                type={'number'}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="category"
                label="Category"
                value={category || ''}
                type={'number'}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="rentalMin"
                label="Rental Min"
                value={rentalMin || ''}
                type={'number'}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="title"
                label="Title"
                value={title || ''}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="brand"
                label="Brand"
                value={brand || ''}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="gender"
                label="Gender"
                value={gender || ''}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="size"
                label="Size"
                value={size || ''}
                type={'number'}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="condition"
                label="Condition"
                value={condition || ''}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="price"
                label="Price"
                value={price || ''}
                type={'number'}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="description"
                label="Description"
                value={description || ''}
                variant="outlined"
              />
            </ListItem>
            <ListItem>
              <TextField
                id="keyword"
                label="Keyword"
                value={keyword || ''}
                variant="outlined"
              />
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
