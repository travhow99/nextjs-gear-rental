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
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
	const { cart } = useSelector((state) => state);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		setCartCount(cart.cartItems.length);
	}, [cart]);

	const classes = useStyles();

	const headerImg =
		'https://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-drives/1024/Generic-icon.png';
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
							<Badge color="secondary" badgeContent={cartCount}>
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
