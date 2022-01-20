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

/**
 * @todo format with ProfilePage component
 */
export default function Account() {
  const { state, dispatch } = useContext(Store);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  /* const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  }); */

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

  /**
   * @todo not setting upon authentication
   */
  useEffect(() => {
    console.log('status', status);
    if (status) {
      //   setValue('name', session.user.name);
      //   setValue('email', session.user.email);
    }
  }, [status]);
  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    try {
      //   const { data } = await axios.put('/api/users/profile', {
      //     name,
      //     email,
      //     password,
      //   });
      //   dispatch({ type: 'USER_LOGIN', payload: data });
      //   Cookies.set('userInfo', data);

      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return status ? (
    <ProfileContainer title={'Account'}>
      <Card className={classes.section}>
        <List>
          <ListItem>
            <Typography component="h1" variant="h1">
              Account
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
    <div>
      <CircularProgress />
    </div>
  );
}

Account.auth = true;

// export default dynamic(() => Promise.resolve(Account), { ssr: false });
