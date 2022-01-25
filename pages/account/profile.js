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

/**
 * @todo format with ProfilePage component
 */
function Profile() {
  const { state, dispatch } = useContext(Store);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const loggedIn = !!session?.user;

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
    if (loggedIn) {
      setValue('name', session.user.name);
      setValue('email', session.user.email);
    }
  }, [loggedIn]);
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
    <ProfileContainer title={'Profile'}>
      <Card className={classes.section}>
        <List>
          <ListItem>
            <Typography component="h1" variant="h1">
              Profile
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
                        id="name"
                        label="Name"
                        inputProps={{ type: 'name' }}
                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === 'minLength'
                              ? 'Name length is more than 1'
                              : 'Name is required'
                            : ''
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        inputProps={{ type: 'email' }}
                        error={Boolean(errors.email)}
                        helperText={
                          errors.email
                            ? errors.email.type === 'pattern'
                              ? 'Email is not valid'
                              : 'Email is required'
                            : ''
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    color="primary"
                  >
                    Update
                  </Button>
                </ListItem>
              </List>
            </form>
          </ListItem>
        </List>
      </Card>
    </ProfileContainer>
  ) : (
    <Loading />
  );
}

Profile.auth = true;

export default Profile;
