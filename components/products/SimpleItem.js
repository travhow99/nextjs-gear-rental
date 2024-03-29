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
import ProductHelper from '../../utils/helpers/ProductHelper';
import { useSnackbar } from 'notistack';

export default function SimpleItem(props) {
	const router = useRouter();
	// const cart = useSelector();
	const dispatch = useDispatch();
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();

	const product = props.product;

	/**
	 * @deprecated
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

	/**
	 *
	 * @todo
	 * @param {*} product
	 */
	const quickLookModalHandler = (product) => {};

	return (
		<Card>
			<NextLink href={`/product/${product.slug}`} passHref>
				<CardActionArea>
					<CardMedia
						component="img"
						image={
							product.imageUrl || product.images.length
								? product.images[product.images.length - 1].path
								: 'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
						}
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
					// onClick={() => addToCartHandler(product)}
				>
					Quick Look
				</Button>
			</CardActions>
		</Card>
	);
}
