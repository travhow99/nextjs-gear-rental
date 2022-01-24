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

export default function UnauthorizedPage() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes._404}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h1">
            Unauthorized
          </Typography>
        </Grid>

        <NextLink href="/" passHref>
          <Link>
            <Typography className={classes.brand}>adventurebuddy</Typography>
          </Link>
        </NextLink>
      </Container>
    </div>
  );
}
