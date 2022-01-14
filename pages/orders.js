import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
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
import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';
import { Store } from '../utils/store';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import useStyles from '../utils/styles';

function Orders() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();

  console.log('state?', state);
  const { orders, requestLoading, requestError, paySuccess } = state;

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  useEffect(() => {
    console.log('use effect!!');
    if (!orders.length) fetchOrders();
  }, [orders]);

  const fetchOrders = async () => {
    try {
      console.log('fetching order!!');
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/orders/history`);
      console.log('got data', data);
      dispatch({ type: 'FETCH_SUCCESS', action: 'orders', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_FAIL' });
    }
  };

  return (
    <Layout title="Cart">
      <Typography coponent="h1" variant="h1">
        Cart
      </Typography>
      {orders.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <NextLink href="/">
            <Link>Keep Shopping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Placed</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Ship To</TableCell>
                    <TableCell>Order #</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order.createdAt}</TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>{order.paidAt || 'Unpaid'}</TableCell>
                      <TableCell>{order.shippingAddress.fullName}</TableCell>

                      <TableCell>
                        <NextLink href={`/order/${order._id}`} passHref>
                          <Link>
                            <Typography>{order._id}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Orders), { ssr: false });
