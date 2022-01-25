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
} from '@material-ui/core';
import { getError } from '../../utils/error';
import useStyles from '../../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import Layout from '../../components/layout/Layout';
import { Store } from '../../utils/Store';
import { signIn, useSession } from 'next-auth/react';
import ProfileContainer from '../../components/account/ProfileContainer';
import Loading from '../../components/Loading';
import LoadingPage from '../../components/pages/LoadingPage';
import SideNav from '../../components/layout/SideNav';
import SellerContainer from '../../components/seller/SellerContainer';

function Inventory() {
  const { state, dispatch } = useContext(Store);
  const { data: session, status } = useSession({
    required: true,
  });

  console.log('session?', session);
  const isUser = !!session?.user;

  const isSeller =
    isUser && (session.user.seller || session.user.role === 'admin');

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
  //   const { userInfo } = state;

  return status ? (
    <SellerContainer title={'Inventory'}>
      <Card className={classes.section}>
        <List>
          <ListItem>
            <Typography component="h1" variant="h1">
              Add Item
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="p" variant="subtitle1">
              Welcome to the Inventory Portal!
            </Typography>
          </ListItem>
          <ListItem>
            <Button variant="outlined" color="primary">
              <Link
                href="/seller/products/new"
                // component="button"
              >
                Add Product
              </Link>
            </Button>
          </ListItem>
        </List>
      </Card>
    </SellerContainer>
  ) : (
    <Loading />
  );
}

Inventory.auth = {
  role: 'seller',
  loading: <LoadingPage />,
  unauthorized: '/',
};

export default Inventory;
