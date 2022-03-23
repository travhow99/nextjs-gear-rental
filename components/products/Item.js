import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  TextField,
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import { addItem } from '../../redux/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import DateHelper from '../../utils/DateHelper';
import ServerRequestDatePicker from './ProductCalendar';

export default function Item(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const todaysDate = new Date();

  const today = DateHelper.getTodayForDateInput();
  const tomorrow = DateHelper.getTomorrowForDateInput();

  const [dateIn, setDateIn] = useState(today);
  const [dateOut, setDateOut] = useState(tomorrow);

  const classes = useStyles();
  const product = props.product;

  const addToCartHandler = async () => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.stock < quantity) {
      enqueueSnackbar('OUT OF STOCK', { variant: 'error' });

      alert('OUT OF STOCK');
      return;
    }

    dispatch(addItem({ ...product, quantity }));

    router.push('/cart');
  };

  // console.log(product.rental_min, product.stock);
  console.log('new product!!', product);
  return (
    <>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={
              product.imageUrl || product.images.length
                ? product.images[product.images.length - 1].path
                : 'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
            }
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.title}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.reviewCount} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item md={12} xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item md={12} xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <Typography>
                      {product.stock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {/**
               *
               * @todo use date-range picker
               *
               */}
              <ListItem>
                <TextField
                  type={'date'}
                  value={dateIn}
                  onChange={(e) => setDateIn(e.target.value)}
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <TextField
                  type={'date'}
                  value={dateOut}
                  onChange={(e) => setDateOut(e.target.value)}
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <ServerRequestDatePicker />
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
