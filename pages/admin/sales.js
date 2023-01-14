import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext } from 'react';
import {
  Grid,
  Link,
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
import AdminContainer from '../../components/admin/AdminContainer';
import { Stack } from '@mui/material';
import ProductHelper from '../../utils/helpers/ProductHelper';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminSalesRequest,
  adminSalesSuccess,
  adminSalesFail,
} from '../../redux/admin/adminSlice';

function Sales() {
  const dispatch = useDispatch();
  const {
    admin: { sales },
  } = useSelector((state) => state);

  const { data: session, status } = useSession({
    required: true,
  });

  console.log('session?', session);
  const isUser = !!session?.user;

  const isAdmin = isUser && session.user.role === 'admin';

  console.log('is admin?', isAdmin);

  // const { orders } = state;

  /**
   * @todo determine if this should happen every page load or pull from store?
   */
  useEffect(() => {
    if (!sales.length) fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log('fetching orders!!');
      dispatch(adminSalesRequest());

      const { data } = await axios.get(`/api/admin/orders`);
      console.log('got data', data);
      dispatch(adminSalesSuccess(data));
    } catch (error) {
      dispatch(adminSalesFail(error));
    }
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();
  //   const { userInfo } = state;

  return status ? (
    <AdminContainer title={'Sales'}>
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
          {sales.length ? (
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
                  {sales
                    .slice(0)
                    .reverse()
                    .map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>
                          {ProductHelper.formatPurchaseDate(order.createdAt)}
                        </TableCell>
                        <TableCell>
                          ${ProductHelper.roundToPenny(order.totalPrice)}
                        </TableCell>
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
          ) : (
            <ListItem>No sales found.</ListItem>
          )}
        </List>
      </Card>
    </AdminContainer>
  ) : (
    <Loading />
  );
}

Sales.auth = { role: 'admin', loading: <LoadingPage />, unauthorized: '/' };

export default Sales;
