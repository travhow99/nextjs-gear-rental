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

function Admin() {
  const auth = true;
  const { state, dispatch } = useContext(Store);
  const { data: session, status } = useSession({
    required: true,
  });

  console.log('session?', session);
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
    <ProfileContainer title={'Admin'}>
      <Card className={classes.section}>
        <List>
          <ListItem>
            <Typography component="h1" variant="h1">
              Admin
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="p" variant="subtitle1">
              Let's get started!
            </Typography>
          </ListItem>
        </List>
      </Card>
    </ProfileContainer>
  ) : (
    <Loading />
  );
}

Admin.auth = { role: 'admin', loading: <Loading />, unauthorized: '/' };

export default Admin;
