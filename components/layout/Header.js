import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Switch,
  Badge,
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import LoginText from './LoginText';

export default function Header({ darkMode, darkModeChangeHandler, cart }) {
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
            <Link>
              {cart?.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  Cart
                </Badge>
              ) : (
                'Cart'
              )}
            </Link>
          </NextLink>
          <LoginText />
        </div>
      </Toolbar>
    </AppBar>
  );
}
