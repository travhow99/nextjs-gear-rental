import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect } from 'react';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  // TextField,
  CircularProgress,
} from '@material-ui/core';
import { getError } from '../../../utils/error';
import useStyles from '../../../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import Layout from '../../../components/layout/Layout';
import { signIn, useSession } from 'next-auth/react';
import ProfileContainer from '../../../components/account/ProfileContainer';
import Loading from '../../../components/Loading';
import LoadingPage from '../../../components/pages/LoadingPage';
import SideNav from '../../../components/layout/SideNav';
import SellerContainer from '../../../components/seller/SellerContainer';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  brandSuccess,
  brandRequest,
  brandFail,
} from '../../../redux/brand/brandSlice';
import {
  categorySuccess,
  categoryRequest,
  categoryFail,
} from '../../../redux/category/categorySlice';

function AddProduct() {
  const dispatch = useDispatch();
  const {
    brand: { brands },
    category: { categories },
  } = useSelector((state) => state);

  const { data: session, status } = useSession({
    required: true,
  });

  console.log('session?', session);
  const isUser = !!session?.user;

  const isSeller =
    isUser && (session.user.seller || session.user.role === 'admin');

  useEffect(() => {
    if (!brands.length) fetchBrands();
    if (!categories.length) fetchCategories();
  }, [brands]);

  const fetchBrands = async () => {
    try {
      dispatch(brandRequest());

      const { data } = await axios.get('/api/brands');
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

      const { data } = await axios.get('/api/categories');

      dispatch(categorySuccess(data));
    } catch (error) {
      console.log('fetch error', error);

      dispatch(categoryFail(error));
    }
  };

  console.log('is seller?', isSeller);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();

  const submitHandler = async () => {
    // console.log('input:', input);
    closeSnackbar();
    try {

      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  //   const { userInfo } = state;

  return status ? (
    <SellerContainer title={'Add Product'}>
      <Card className={classes.section}>
        <List>
          <ListItem>
            <Typography component="h1" variant="h1">
              Add Product
            </Typography>
          </ListItem>
          <ListItem>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className={classes.form}
            >
              <List>
                <ListItem>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="title"
                        label="Product Name"
                        inputProps={{ type: 'title' }}
                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === 'minLength'
                              ? 'Product Name length is more than 1'
                              : 'Product Name is required'
                            : ''
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={brands.map((brand) => brand.title)}
                    renderInput={(params) => (
                      <TextField {...params} label="Brand" />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={categories.map((category) => category.name)}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    color="primary"
                  >
                    Add
                  </Button>
                </ListItem>
              </List>
            </form>
          </ListItem>
        </List>
      </Card>
    </SellerContainer>
  ) : (
    <Loading />
  );
}

AddProduct.auth = {
  role: 'seller',
  loading: <LoadingPage />,
  unauthorized: '/',
};

export default AddProduct;
