import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import useStyles from '../../utils/styles';

export default function Header() {
  const classes = useStyles();

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
