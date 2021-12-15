import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Link, Switch } from '@material-ui/core';
import useStyles from '../../utils/styles';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { Store } from '../../utils/store';

export default function Header({ darkMode, darkModeChangeHandler }) {
  const classes = useStyles();

  console.log('checked??', darkMode);

  const headerImg =
    'https://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-drives/1024/Generic-icon.png';
  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link>
            <Typography className={classes.brand}>adventurebuddy</Typography>
          </Link>
        </NextLink>
        <div className={classes.grow}></div>
        <div>
          <Switch checked={darkMode} onChange={darkModeChangeHandler} />
          <NextLink href="/cart" passHref>
            <Link>Cart</Link>
          </NextLink>
          <NextLink href="/login" passHref>
            <Link>Login</Link>
          </NextLink>
        </div>
      </Toolbar>
    </AppBar>
  );
}
