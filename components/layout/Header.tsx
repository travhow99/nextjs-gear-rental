import NextLink from 'next/link';
import {
	AppBar,
	Toolbar,
	Typography,
	Link,
	Switch,
	Badge,
} from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useStyles from '../../utils/styles';
import LoginText from './LoginText';
import useCart from '../../utils/hooks/useCart';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import useLocalStorage from '../../utils/hooks/useLocalStorage';
import { useSelector } from 'react-redux';

interface RootState {
	cart: {
		cartId: string | null;
	};
}

export default function Header() {
	const { cart } = useCart();

	const classes = useStyles();

	return (
		<AppBar position="static" className={classes.navbar}>
			<Toolbar>
				<NextLink href="/" passHref>
					<Link>
						<Typography className={classes.brand}>
							adventurebuddy
						</Typography>
					</Link>
				</NextLink>
				<div className={classes.grow}></div>
				<div>
					<NextLink href="/cart" passHref>
						<Link>
							<Badge
								color="secondary"
								badgeContent={cart ? cart.cartItems.length : 0}
							>
								<ShoppingCartIcon />
							</Badge>
						</Link>
					</NextLink>
					<LoginText />
				</div>
			</Toolbar>
		</AppBar>
	);
}
