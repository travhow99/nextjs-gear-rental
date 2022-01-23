import { Container, Grid, Link, Typography } from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../utils/styles';

export default function Custom404() {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes._404}>
        <Typography component="h2" variant="h2">
          404 - Page Not Found
        </Typography>
        <NextLink href="/" passHref>
          <Link>
            <Typography className={classes.brand}>adventurebuddy</Typography>
          </Link>
        </NextLink>
      </Grid>
    </div>
  );
}
