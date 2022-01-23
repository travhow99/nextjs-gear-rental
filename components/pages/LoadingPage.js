import {
  Container,
  Link,
  Typography,
  Grid,
  LinearProgress,
  CircularProgress,
} from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../../utils/styles';

export default function LoadingPage() {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes._404}>
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>

        <NextLink href="/" passHref>
          <Link>
            <Typography className={classes.brand}>adventurebuddy</Typography>
          </Link>
        </NextLink>
      </Grid>
    </div>
  );
}
