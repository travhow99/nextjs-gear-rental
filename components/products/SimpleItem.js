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

export default function SimpleItem(props) {
  const router = useRouter();
  // const cart = useSelector();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);

  console.log('cart', cart, props);
  const product = props.product;

  const addToCartHandler = async (product) => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.stock < quantity) {
      alert('OUT OF STOCK');
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
