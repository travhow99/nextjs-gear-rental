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
import { addItem } from '../../redux/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductHelper from '../../utils/methods/product';
import { useSnackbar } from 'notistack';

export default function SimpleItem(props) {
  const router = useRouter();
  // const cart = useSelector();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  console.log('cart', cart, props);
  const product = props.product;

  /**
   * @todo implement useApi hook
   * ../../utils/hooks/useApi.js
   */
  const addToCartHandler = async (product) => {
    closeSnackbar();

    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.stock < quantity) {
      enqueueSnackbar('OUT OF STOCK', { variant: 'error' });
      return;
    }

    dispatch(addItem({ ...product, quantity }));

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
