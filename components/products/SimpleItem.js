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
import axios from 'axios';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../../utils/store';

export default function SimpleItem(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  console.log(props);
  const product = props.product;

  const addToCartHandler = async (product) => {
    const existingItem = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.stock < quantity) {
      alert('OUT OF STOCK');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref>
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
      </NextLink>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
