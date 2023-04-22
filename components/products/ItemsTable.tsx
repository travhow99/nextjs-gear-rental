import {
	Button,
	Link,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import Image from 'next/image';
import NextLink from 'next/link';
import { useDispatch } from 'react-redux';
import SellerProduct from '../../types/SellerProduct';
import SellerProductWithRentalDateOrCartItemDate from '../../types/SellerProductWithRentalDate';
import dateHelper from '../../utils/dateHelper';
import { removeItemFromCart } from '../../utils/helpers/api/CartHelper';
import ProductHelper from '../../utils/helpers/ProductHelper';

export default function ItemsTable({
	items,
	isCartPage,
}: {
	items: Array<SellerProductWithRentalDateOrCartItemDate>;
	isCartPage: boolean;
}) {
	console.log('I', items);
	const dispatch = useDispatch();

	const removeCartHandler = async (
		product: SellerProductWithRentalDateOrCartItemDate
	) => {
		dispatch(removeItemFromCart(product.id));
	};

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Item</TableCell>
						<TableCell align="right">Days</TableCell>
						<TableCell align="right">Price / day</TableCell>
						<TableCell align="right">Total Price</TableCell>
						<TableCell align="right">Dates</TableCell>
						{isCartPage && (
							<TableCell align="right">Action</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<NextLink
									href={`/product/${item.slug}`}
									passHref
								>
									<Link>
										<Image
											src={
												item.images.length
													? item.images[
															item.images.length -
																1
													  ].path
													: 'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
											}
											alt={item.title}
											width={50}
											height={50}
										></Image>
									</Link>
								</NextLink>
							</TableCell>

							<TableCell>
								<NextLink
									href={`/product/${item.slug}`}
									passHref
								>
									<Link>
										<Typography>{item.title}</Typography>
									</Link>
								</NextLink>
							</TableCell>

							<TableCell align="right">
								<Typography>
									{dateHelper.getReadableNumberOfDaysBetween(
										new Date(
											isCartPage
												? item.startDate
												: item.dateOut
										),
										new Date(
											isCartPage
												? item.endDate
												: item.dateDue
										)
									)}
								</Typography>
							</TableCell>

							<TableCell align="right">
								<Typography>${item.price}</Typography>
							</TableCell>

							<TableCell align="right">
								<Typography>
									$
									{ProductHelper.getProductTotalPrice(
										item.price,
										{
											startDate: isCartPage
												? item.startDate
												: item.dateOut,
											endDate: isCartPage
												? item.endDate
												: item.dateDue,
										}
									)}
								</Typography>
							</TableCell>

							<TableCell align="right">
								<Typography>
									{dateHelper.getHumanReadableDateRangeText(
										new Date(
											isCartPage
												? item.startDate
												: item.dateOut
										),
										new Date(
											isCartPage
												? item.endDate
												: item.dateDue
										)
									)}
								</Typography>
							</TableCell>

							{isCartPage && (
								<TableCell align="right">
									<Button
										variant="contained"
										color="secondary"
										onClick={(e) => removeCartHandler(item)}
									>
										x
									</Button>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
