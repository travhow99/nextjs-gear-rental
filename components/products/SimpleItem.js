import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function SimpleItem(props) {
  console.log(props);
  const product = props.product;

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={product.imageUrl}
          title={product.title}
        ></CardMedia>
        <CardContent>
          <Typography>{product.title}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
