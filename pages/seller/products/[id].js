/**
 * @todo Show Product & allow editing
 * Photo upload
 */

import {
	Button,
	Card,
	CircularProgress,
	Grid,
	List,
	ListItem,
	TextField,
	Typography,
} from '@material-ui/core';
import { Autocomplete, TextField as MuiTextField } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';
import LoadingPage from '../../../components/pages/LoadingPage';
import BlockOutForm from '../../../components/seller/BlockOutForm';
import RentalForm from '../../../components/seller/RentalForm';
import ImageUpload from '../../../components/seller/ImageUpload';
import SellerContainer from '../../../components/seller/SellerContainer';
import {
	brandFail,
	brandRequest,
	brandSuccess,
} from '../../../redux/brand/brandSlice';
import {
	categoryFail,
	categoryRequest,
	categorySuccess,
} from '../../../redux/category/categorySlice';
import { sellerUploadRequest } from '../../../redux/seller/sellerSlice';
import SellerHelper from '../../../utils/seller/SellerHelper';

import useStyles from '../../../utils/styles';
import Link from 'next/link';

const initialProduct = {
	category: '',
	stock: 1,
	rentalMin: 1,
	title: '',
	brand: '',
	gender: '',
	size: '',
	condition: '',
	price: '',
	description: '',
	keyword: '',
	images: [],
	rentals: [],
};

function SellerProduct({ params }) {
	const sellerProductId = params.id;
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const [brandInputValue, setBrandInputValue] = useState('');
	const [categoryInputValue, setCategoryInputValue] = useState('');
	const [blockOuts, setBlockOuts] = useState(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [product, setProduct] = useState(initialProduct);

	const classes = useStyles();

	const dispatch = useDispatch();
	const {
		brand: { brands },
		category: { categories },
		seller: { uploadRequestLoading, uploadRequestError },
	} = useSelector((state) => state);

	const { data: session, status } = useSession({
		required: true,
	});

	useEffect(() => {
		setLoading(true);
		if (!brands.length) fetchBrands();
		if (!categories.length) fetchCategories();
		if (!product.title) fetchSellerProduct();
	}, []);

	const fetchSellerProduct = async () => {
		try {
			const { data } = await axios.get(
				`/api/sellerProducts/${sellerProductId}`
			);

			console.log('got data', data);

			setBlockOuts(data.blockOuts);

			setProduct({
				category: data.category,
				stock: data.stock,
				rentalMin: data.rentalMin,
				title: data.title,
				brand: data.brand,
				gender: data.gender,
				size: data.size,
				condition: data.condition,
				price: data.price,
				description: data.description,
				keyword: data.keyword,
				images: data.images,
				rentals: data.rentals,
			});

			setLoading(false);
		} catch (err) {
			console.log('got err!', err);

			router.push('/seller/products');
		}
	};

	const fetchBrands = async () => {
		try {
			dispatch(brandRequest());

			const data = await SellerHelper.fetchBrands();
			console.log('got brands', data);

			dispatch(brandSuccess(data));
		} catch (error) {
			console.log('fetch error', error);

			dispatch(brandFail(error));
		}
	};

	const fetchCategories = async () => {
		try {
			dispatch(categoryRequest());

			const data = await SellerHelper.fetchCategories();
			console.log('got cats', data);

			dispatch(categorySuccess(data));
		} catch (error) {
			console.log('fetch error', error);

			dispatch(categoryFail(error));
		}
	};

	/**
	 * @todo compare to return data & only PUT if data has changed
	 */
	const handleBlur = async (e) => {
		closeSnackbar();

		console.log(e, e.target, e.target.name, e.target.value);

		if (!checkForChange(e.target.name, e.target.value)) return;

		try {
			const { data } = await axios.put(
				`/api/sellerProducts/${sellerProductId}`,
				{
					[e.target.name]: e.target.value,
				}
			);

			setProduct(data.result);

			enqueueSnackbar('Product updated successfully', {
				variant: 'success',
			});

			console.log('blur data', data);
		} catch (error) {
			console.log('got err!', error);
			enqueueSnackbar(getError(error), { variant: 'error' });
		}
	};

	const onImageUpload = (data) => {
		console.log('img upload data', data);

		const updatedImages = [...product.images, data];
		setImages(updatedImages);
	};

	const checkForChange = (name, val) => {
		return val != product[name];
	};

	const handleInputChange = (e) => {
		//const name = e.target.name
		//const value = e.target.value
		const { name, value } = e.target;

		// console.log('update', name, value);

		setProduct({
			...product,
			[name]: value,
		});
	};

	return status ? (
		<SellerContainer title={'Products'}>
			<Card className={classes.section}>
				{product.title ? (
					<List>
						<ListItem>
							<Typography
								component="h1"
								variant="h1"
								className="flex-auto"
							>
								{product.title}
							</Typography>
							<Button variant="outlined" color="primary">
								<Link href="/seller/products">
									Back to Products
								</Link>
							</Button>
						</ListItem>
						<ListItem>
							<Grid container spacing={1}>
								{/**
								 * @todo upgrade to using image list
								 * https://mui.com/components/image-list/
								 */}
								{product.images?.length >= 1 &&
									product.images.map((image) => (
										<Grid key={image._id} item xs={3}>
											<Image
												priority
												src={image.path}
												alt={''}
												width={640}
												height={640}
												layout="responsive"
											></Image>
										</Grid>
									))}

								<ImageUpload
									productId={sellerProductId}
									onUpload={onImageUpload}
								/>
							</Grid>
						</ListItem>
						<ListItem>
							<TextField
								fullWidth
								id="title"
								name="title"
								label="Title"
								defaultValue={product.title || ''}
								variant="outlined"
								// onChange={handleInputChange}
								// onChange={(e, newValue) => {
								// setTitle(e.target.value);
								// }}
								onBlur={handleBlur}
							/>
						</ListItem>

						<ListItem>
							<Grid container spacing={1}>
								<Grid item xs>
									<TextField
										fullWidth
										id="stock"
										name="stock"
										label="Stock"
										defaultValue={product.stock || ''}
										type={'number'}
										variant="outlined"
										// onChange={handleInputChange}
										onBlur={handleBlur}
									/>
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										id="rentalMin"
										name="rentalMin"
										label="Rental Min"
										defaultValue={product.rentalMin || ''}
										type={'number'}
										variant="outlined"
										// onChange={handleInputChange}
										onBlur={handleBlur}
									/>
								</Grid>
							</Grid>
						</ListItem>
						<ListItem>
							<Grid container spacing={1}>
								<Grid item xs>
									<Autocomplete
										fullWidth
										name="brand"
										options={brands.map(
											(brand) => brand.title
										)}
										defaultValue={product.brand || null}
										// onChange={handleInputChange}
										inputValue={brandInputValue}
										onInputChange={(e, newValue) => {
											setBrandInputValue(newValue);
											console.log(
												// 'onchange input',
												e,
												newValue
											);
										}}
										onBlur={handleBlur}
										disableClearable
										renderInput={(params) => (
											<MuiTextField
												fullWidth
												{...params}
												label="Brand"
												// error={Boolean(errors.brand)}
												/* helperText={
                      errors.brand
                        ? errors.brand.type === 'minLength'
                          ? 'Brand length is more than 1'
                          : 'Brand is required'
                        : ''
                    } */
											/>
										)}
									/>
								</Grid>
								<Grid item xs>
									<Autocomplete
										fullWidth
										name="category"
										disableClearable
										options={categories.map(
											(category) => category.name
										)}
										defaultValue={product.category || null}
										// onChange={handleInputChange}
										inputValue={categoryInputValue}
										onInputChange={(e, newValue) => {
											setCategoryInputValue(newValue);
											console.log(
												// 'onchange input',
												e,
												newValue
											);
										}}
										onBlur={handleBlur}
										renderInput={(params) => (
											<MuiTextField
												{...params}
												label="Category"
												/* error={Boolean(errors.category)}
                      helperText={
                        errors.category
                          ? errors.category.type === 'minLength'
                            ? 'Category length is more than 1'
                            : 'Category is required'
                          : ''
                      } */
											/>
										)}
									/>
								</Grid>
							</Grid>
						</ListItem>

						<ListItem>
							<Grid container spacing={1}>
								<Grid item xs>
									<TextField
										fullWidth
										id="gender"
										name="gender"
										label="Gender"
										defaultValue={product.gender || ''}
										variant="outlined"
										// onChange={handleInputChange}
										onBlur={handleBlur}
									/>
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										id="size"
										name="size"
										label="Size"
										defaultValue={product.size || ''}
										type={'number'}
										variant="outlined"
										// onChange={handleInputChange}
										onBlur={handleBlur}
									/>
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										id="condition"
										name="condition"
										label="Condition"
										defaultValue={product.condition || ''}
										variant="outlined"
										// onChange={handleInputChange}
										onBlur={handleBlur}
									/>
								</Grid>
							</Grid>
						</ListItem>
						<ListItem>
							<Grid container spacing={1}>
								<Grid item xs>
									<TextField
										fullWidth
										id="price"
										name="price"
										label="Price"
										defaultValue={product.price || ''}
										type={'number'}
										variant="outlined"
										// onChange={handleInputChange}
										onBlur={handleBlur}
									/>
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										id="keyword"
										name="keyword"
										label="Keyword"
										defaultValue={product.keyword || ''}
										variant="outlined"
										// onChange={handleInputChange}
										onBlur={handleBlur}
									/>
								</Grid>
							</Grid>
						</ListItem>
						<ListItem>
							<TextField
								name="description"
								variant="outlined"
								fullWidth
								id="sellerProductDescription"
								// labelId="sellerProductDescription"
								label="Description"
								defaultValue={product.description || ''}
								// onChange={handleInputChange}
								onBlur={handleBlur}
								multiline
								maxRows={4}
								/* error={Boolean(errors.description)}
                    helperText={
                      errors.description ? 'Description is required' : ''
                    } */
							/>
						</ListItem>
					</List>
				) : (
					<CircularProgress />
				)}
			</Card>

			<RentalForm rentals={product.rentals} productId={sellerProductId} />
			<BlockOutForm
				updateBlockOuts={setBlockOuts}
				productId={sellerProductId}
				blockOuts={blockOuts}
			/>
		</SellerContainer>
	) : (
		<Loading />
	);
}

export async function getServerSideProps({ params }) {
	return { props: { params } };
}

SellerProduct.auth = {
	role: 'seller',
	loading: <LoadingPage />,
	unauthorized: '/',
};

export default SellerProduct;
