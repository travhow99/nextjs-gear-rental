import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useContext } from 'react';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import useStyles from '../../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import Layout from '../../components/layout/Layout';
import { signIn, useSession } from 'next-auth/react';
import ProfileContainer from '../../components/account/ProfileContainer';
import Loading from '../../components/Loading';
import LoadingPage from '../../components/pages/LoadingPage';
import SideNav from '../../components/layout/SideNav';
import { SellerStore } from '../../utils/seller/SellerStore';
import { Stack } from '@mui/material';
import ProductHelper from '../../utils/methods/product';
import SellerContainer from '../../components/seller/SellerContainer';

function SellerSales() {
  const { state, dispatch } = useContext(SellerStore);
  const { data: session, status } = useSession({
    required: true,
  });

  console.log('session?', session);
  const isUser = !!session?.user;

  const isSeller =
    isUser && (session.user.seller || session.user.role === 'admin');

  console.log('is seller?', isSeller);

  const { orders } = state;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/seller/orders');
      console.log('got orders', data);
      dispatch({ type: 'FETCH_SUCCESS', action: 'orders', payload: data });
    } catch (error) {
      console.log('fetch erro', error);
      dispatch({ type: 'FETCH_FAIL' });
    }
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();
  //   const { userInfo } = state;

  return status ? (
    <SellerContainer title={'Sales'}>
      <Card className={classes.section}>
        <List>
          <ListItem>
            <Typography component="h1" variant="h1">
              Sales
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="p" variant="subtitle1">
              Here are your recent sales.
            </Typography>
          </ListItem>
        </List>
      </Card>
      <Card className={classes.section}>
        <List>
          {orders.length ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Placed</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Order #</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        {ProductHelper.formatPurchaseDate(order.createdAt)}
                      </TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>
                        {order.paidAt ? (
                          <Stack>
                            <Chip
                              label={ProductHelper.formatPurchaseDate(
                                order.paidAt
                              )}
                              color="primary"
                              variant="outlined"
                            />
                          </Stack>
                        ) : (
                          <Stack>
                            <Chip
                              label="Unpaid"
                              color="default"
                              // variant="outlined"
                            />
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <ListItem>No orders found.</ListItem>
          )}
        </List>
      </Card>
    </SellerContainer>
  ) : (
    <Loading />
  );
}

SellerSales.auth = {
  role: 'seller',
  loading: <LoadingPage />,
  unauthorized: '/',
};

export default SellerSales;
