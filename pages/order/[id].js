import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import axios from 'axios';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';
import { signIn, useSession } from 'next-auth/react';
import { Store } from '../../utils/store';
import Layout from '../../components/layout/Layout';
import useStyles from '../../utils/styles';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { getError } from '../../utils/error';

function Order({ params }) {
  const orderId = params.id;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const classes = useStyles();
  const router = useRouter();
  console.log('REQ', Store);
  const { state, dispatch } = useContext(Store);
  console.log('STATE', state);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  console.log('state?', state);
  const { order, requestLoading, requestError, paySuccess } = state;

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  useEffect(() => {
    /* if (!paymentMethod) {
      router.push('/payment');
    } */

    if (!order._id || paySuccess || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (paySuccess) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      loadPayPalScript();
    }
  }, [order, paySuccess]);

  const fetchOrder = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/orders/${orderId}`);
      console.log('got data', data);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_FAIL' });
    }
  };

  const loadPayPalScript = async () => {
    const { data: clientId } = await axios.get('/api/keys/paypal');

    paypalDispatch({
      type: 'resetOptions',
      value: {
        'client-id': clientId,
        currency: 'USD',
      },
    });
    paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );

        dispatch({ type: 'PAY_SUCCESS', payload: data });

        enqueueSnackbar('Order paid successfully!', { variant: 'success' });
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });

        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    });
  };

  const onError = (err) => {
    enqueueSnackbar(getError(err), { variant: 'error' });
  };

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography coponent="h1" variant="h1">
        Order {orderId}
      </Typography>

      {requestLoading ? (
        <CircularProgress />
      ) : requestError ? (
        <Typography className={classes.error}>{requestError}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
              </List>
            </Card>

            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.title}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>

                            <TableCell align="right">${item.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography variant="h2">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        ${taxPrice * itemsPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>${totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {!isPaid && (
                  <ListItem>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                      <div className={classes.fullWidth}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                  </ListItem>
                )}
                {/* <ListItem>
                  <Button
                    onClick={placeOrderHandler}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {requestLoading ? (
                      <ListItem>
                        <CircularProgress />
                      </ListItem>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </ListItem> */}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
