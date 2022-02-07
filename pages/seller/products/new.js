import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
import { Controller, useForm, useFormState } from 'react-hook-form';
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
import ControlledAutoComplete from '../../../components/utilities/form/ControlledAutoComplete';
import CountrySelect from '../../../components/utilities/form/CountrySelect';

function AddProduct() {
  const [brand, setBrand] = useState(null);
  const [brandInputValue, setBrandInputValue] = useState('');
  const [category, setCategory] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState('');

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
  }, [brands, categories]);

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
    getValues,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();

  const submitHandler = async (data) => {
    console.log('data:', data);
    console.log('formsubmit!!!!');
    closeSnackbar();
    try {
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  //   const { userInfo } = state;

  console.log('form err?', errors);
  console.log(brands.map((brand) => brand.title));

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
                    render={(props) => (
                      <Autocomplete
                        {...props}
                        options={brands.map((brand) => brand.title)}
                        // getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            placeholder="Select a Country"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                          />
                        )}
                        onChange={(_, data) => setBrand(data)}
                      >
                        {console.log('autocomp props', props)}
                      </Autocomplete>
                    )}
                    name="country"
                    control={control}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    name="name"
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
                    value={brand}
                    onChange={(e, newValue) => {
                      setBrand(newValue);
                    }}
                    inputValue={brandInputValue}
                    onInputChange={(e, newValue) =>
                      setBrandInputValue(newValue)
                    }
                    // getOptionLabel={getOptionLabel}
                    //   renderOption={renderOption}
                    /* renderInput={renderInput}
                    onChange={(e, data) => {
                      console.log('onchange', data);
                      field.onChange(data);
                    }} */
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Brand"
                        error={Boolean(errors.brand)}
                        helperText={
                          errors.name
                            ? errors.name.type === 'minLength'
                              ? 'Brand length is more than 1'
                              : 'Brand is required'
                            : ''
                        }
                      />
                    )}
                  />
                  {/* <ControlledAutoComplete
                    control={control}
                    rules={{
                      required: true,
                    }}
                    name="brand"
                    freeSolo={true}
                    getOptionLabel={(option) => {
                      console.log(option);
                      return option.label ?? option;
                    }}
                    options={brands.map((brand) => brand.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Brand"
                        error={Boolean(errors.brand)}
                        helperText={
                          errors.name
                            ? errors.name.type === 'minLength'
                              ? 'Brand length is more than 1'
                              : 'Brand is required'
                            : ''
                        }
                      />
                    )}
                    // defaultValue={null}
                  /> */}
                </ListItem>
                <ListItem>
                  <ControlledAutoComplete
                    control={control}
                    rules={{
                      required: true,
                    }}
                    name="category"
                    freeSolo={true}
                    options={categories.map((category) => category.name)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category" /* margin="normal" */
                        error={Boolean(errors.category)}
                        helperText={
                          errors.category
                            ? errors.category.type === 'minLength'
                              ? 'Category length is more than 1'
                              : 'Category is required'
                            : ''
                        }
                      />
                    )}
                    defaultValue={null}
                  />
                </ListItem>
                {/* <ListItem>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={categories.map((category) => category.name)}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                  />
                </ListItem> */}
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
