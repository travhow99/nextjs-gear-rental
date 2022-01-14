import { Button, MenuItem } from '@material-ui/core';
import { Menu } from '@mui/material';
import Cookies from 'js-cookie';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useStyles from '../../utils/styles';

export default function LoginText() {
  const router = useRouter();
  const { data: session } = useSession();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const loginClickHandler = (e) => {
    console.log('login');
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect = null) => {
    setAnchorEl(null);

    console.log(e, 'red?', redirect);
    if (redirect) router.push(redirect);
  };

  const logoutClickHandler = async () => {
    setAnchorEl(null);
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    signOut({
      callbackUrl: '/',
    });
  };

  console.log('sesh:', session);
  if (session) {
    return (
      <>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={loginClickHandler}
          className={classes.navbarButton}
        >
          {session.user.name}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={(e) => loginMenuCloseHandler(e)}
        >
          <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>
            Profile
          </MenuItem>
          <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/account')}>
            My account
          </MenuItem>
          <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/orders')}>
            Orders
          </MenuItem>
          <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
        </Menu>
        {/* <Box>
          Signed in as {session.user.email || session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </Box> */}
      </>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()} className={classes.navbarButton}>
        Sign in
      </Button>
    </>
  );
}
