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
import useApi from '../../../utils/hooks/useApi';

const postProduct = (payload) => axios.post('/api/sellerProducts', payload);

function AddProduct() {
  const [title, setTitle] = useState('');
  // const [titleInputValue, setTitleInputValue] = useState('');
  const [brand, setBrand] = useState(null);
  const [brandInputValue, setBrandInputValue] = useState('');
  const [category, setCategory] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState('');
  const postProductApi = useApi(postProduct);

  const [errors, setErrors] = useState({
    title: null,
    brand: null,
    category: null,
  });

  const rules = {
    title: {
      required: true,
    },
    brand: {
      required: true,
    },
    category: {
      required: true,
    },
  };

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
  /*   const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm(); */

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();

    closeSnackbar();

    console.log('title:', title);
    console.log('submit', 'brand', brand, 'category', category);
    console.log('formsubmit!!!!');

    if (!validateForm({ title: title, brand: brand, category: category })) {
      enqueueSnackbar('There is an error with your submission!', {
        variant: 'error',
      });

      return;
    }

    try {
      const { data } = postProductApi.request({
        product: title,
        // user: session.user, backend
        slug: '',
        category: category,
        rental_min: 1,
        title: title,
        brand: brand,
        price: 0,
        description: '',
      });

      console.log('got post data', data);

      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (err) {
      console.log('got err!', err);
      // enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const validateForm = ({ title, brand, category }) => {
    console.log('validating ', title, brand, category);

    const newErrors = {};

    if (rules.title) {
      console.log('title rules', title);
      if (rules.title.required && (!title || !title.length)) {
        console.log('title req', title);

        newErrors.title = { type: 'required' };
      } else {
        // final else clause to clear errors
        newErrors.title = null;
      }
    }

    if (rules.category) {
      console.log('cat rules', category);

      if (
        rules.category.required &&
        (!category || !category.length) &&
        (!categoryInputValue || !categoryInputValue.length)
      ) {
        newErrors.category = { type: 'required' };
      } else {
        // final else clause to clear errors
        newErrors.category = null;
      }
    }

    console.log(rules);

    if (rules.brand) {
      console.log('brand rules', brand);

      if (
        rules.brand.required &&
        (!brand || !brand.length) &&
        (!brandInputValue || !brandInputValue.length)
      ) {
        newErrors.brand = { type: 'required' };
      } else {
        // final else clause to clear errors
        newErrors.brand = null;
      }
    }

    const newState = {
      ...errors,
      ...newErrors,
    };
    setErrors(newState);

    const errorCount = Object.keys(newState).filter((err) => newState[err]);
    Object.keys(newState).filter((err) => newState[err]);
    const hasErrors = errorCount && errorCount.length >= 1;

    return !hasErrors;
  };

  //   const { userInfo } = state;

  /**
   * @todo Implement mui validation handling
   * https://mui.com/components/text-fields/#validation
   */

  console.log('form err?', errors);
  console.log(title, brand);

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
            <form onSubmit={submitHandler} className={classes.form}>
              <List>
                <ListItem>
                  <TextField
                    name="title"
                    variant="outlined"
                    fullWidth
                    id="title"
                    label="Product Name"
                    value={title}
                    onChange={(e, newValue) => {
                      setTitle(e.target.value);
                    }}
                    // inputValue={titleInputValue}
                    // inputProps={{ type: 'title' }}
                    error={Boolean(errors.title)}
                    helperText={
                      errors.title
                        ? errors.title.type === 'minLength'
                          ? 'Product Name length is more than 1'
                          : 'Product Name is required'
                        : ''
                    }
                  />
                </ListItem>
                <ListItem>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={brands.map((brand) => brand.title)}
                    value={brand}
                    onChange={(e, newValue) => {
                      console.log('onchange', e, newValue);

                      setBrand(newValue);
                    }}
                    inputValue={brandInputValue}
                    onInputChange={(e, newValue) => {
                      setBrandInputValue(newValue);
                      console.log('onchange input', e, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Brand"
                        error={Boolean(errors.brand)}
                        helperText={
                          errors.brand
                            ? errors.brand.type === 'minLength'
                              ? 'Brand length is more than 1'
                              : 'Brand is required'
                            : ''
                        }
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={categories.map((category) => category.name)}
                    value={category}
                    onChange={(e, newValue) => {
                      console.log('onchange', e, newValue);

                      setCategory(newValue);
                    }}
                    inputValue={categoryInputValue}
                    onInputChange={(e, newValue) => {
                      setCategoryInputValue(newValue);
                      console.log('onchange input', e, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
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
                  />
                </ListItem>
                {/* <ListItem>
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
                        label="Category" 
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
                </ListItem> */}
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
