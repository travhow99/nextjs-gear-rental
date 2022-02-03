import { Grid, LinearProgress, Link, Typography } from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../utils/styles';

const Loading = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <LinearProgress color="secondary" />
      </Grid>
      <Grid item md={12} xs={12}>
        <LinearProgress color="primary" />
      </Grid>

      <NextLink href="/" passHref>
        <Link>
          <Typography className={classes.brand}>adventurebuddy</Typography>
        </Link>
      </NextLink>
    </Grid>
  );
};

export default Loading;
