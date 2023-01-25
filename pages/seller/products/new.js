import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
	Grid,
	List,
	ListItem,
	Typography,
	Card,
	Button,
	ListItemText,
	CircularProgress,
	Select,
	MenuItem,
	FormHelperText,
	InputLabel,
	FormControl,
	Box,
	InputAdornment,
} from '@material-ui/core';
import { getError } from '../../../utils/error';
import useStyles from '../../../utils/styles';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import Layout from '../../../components/layout/Layout';
import { signIn, useSession } from 'next-auth/react';
import ProfileContainer from '../../../components/account/ProfileContainer';
import Loading from '../../../components/Loading';
import LoadingPage from '../../../components/pages/LoadingPage';
import SideNav from '../../../components/layout/SideNav';
import SellerContainer from '../../../components/seller/SellerContainer';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	brandSuccess,
	brandRequest,
	brandFail,
} from '../../../redux/brand/brandSlice';
import {
	categorySuccess,
	categoryRequest,
	categoryFail,
} from '../../../redux/category/categorySlice';
import useApi from '../../../utils/hooks/useApi';
import SellerHelper from '../../../utils/seller/SellerHelper';

const postProduct = (payload) => axios.post('/api/sellerProducts', payload);

function AddProduct() {
	const router = useRouter();

	const [title, setTitle] = useState('');
	const [stock, setStock] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	// const [titleInputValue, setTitleInputValue] = useState('');
	const [brand, setBrand] = useState(null);
	const [brandInputValue, setBrandInputValue] = useState('');
	const [category, setCategory] = useState(null);
	const [categoryInputValue, setCategoryInputValue] = useState('');
	const postProductApi = useApi(postProduct);

	const [errors, setErrors] = useState({
		title: null,
		brand: null,
		category: null,
		stock: null,
		description: null,
		price: null,
	});

	const rules = {
		title: {
			required: true,
		},
		brand: {
			required: true,
		},
		category: {
			required: true,
		},
		stock: {
			required: true,
		},
		description: {
			required: true,
		},
		price: {
			required: true,
		},
	};

	const dispatch = useDispatch();
	const {
		brand: { brands },
		category: { categories },
	} = useSelector((state) => state);

	const { data: session, status } = useSession({
		required: true,
	});

	const isUser = !!session?.user;

	const isSeller =
		isUser && (session.user.seller || session.user.role === 'admin');

	useEffect(() => {
		if (!brands.length) fetchBrands();
		if (!categories.length) fetchCategories();
	}, [brands, categories]);

	const fetchBrands = async () => {
		try {
			dispatch(brandRequest());

			const data = await SellerHelper.fetchBrands();

			dispatch(brandSuccess(data));
		} catch (error) {
			console.log('fetch error', error);
		}
	};

	const fetchCategories = async () => {
		try {
			dispatch(categoryRequest());

			const data = await SellerHelper.fetchCategories();

			dispatch(categorySuccess(data));
		} catch (error) {
			dispatch(categoryFail(error));
		}
	};

	/*   const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm(); */

	if (postProductApi.data?._id)
		router.push(`/seller/products/${postProductApi.data._id}`);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const classes = useStyles();

	const submitHandler = async (e) => {
		e.preventDefault();

		closeSnackbar();

		if (
			!validateForm({
				title: title,
				brand: brand,
				category: category,
				stock: stock,
				description: description,
				price: price,
			})
		) {
			enqueueSnackbar('There is an error with your submission!', {
				variant: 'error',
			});

			return;
		}

		try {
			await postProductApi.request({
				product: title,
				slug: '',
				category: category,
				rentalMin: 1,
				title: title,
				brand: brand,
				price: price,
				stock: stock,
				description: description,
			});

			console.log('got post data', postProductApi.data);

			enqueueSnackbar('Product added successfully', {
				variant: 'success',
			});
		} catch (err) {
			console.log('got err!', err);
			// enqueueSnackbar(getError(err), { variant: 'error' });
		}
	};

	const validateForm = (data) => {
		const { title, brand, category } = data;

		const newErrors = {};

		if (rules.title) {
			if (rules.title.required && (!title || !title.length)) {
				newErrors.title = { type: 'required' };
			} else {
				// final else clause to clear errors
				newErrors.title = null;
			}
		}

		if (rules.category) {
			if (
				rules.category.required &&
				(!category || !category.length) &&
				(!categoryInputValue || !categoryInputValue.length)
			) {
				newErrors.category = { type: 'required' };
			} else {
				// final else clause to clear errors
				newErrors.category = null;
			}
		}

		if (rules.brand) {
			if (
				rules.brand.required &&
				(!brand || !brand.length) &&
				(!brandInputValue || !brandInputValue.length)
			) {
				newErrors.brand = { type: 'required' };
			} else {
				// final else clause to clear errors
				newErrors.brand = null;
			}
		}

		if (rules.stock) {
			if (rules.stock.required && !stock) {
				newErrors.stock = { type: 'required' };
			} else {
				// final else clause to clear errors
				newErrors.stock = null;
			}
		}

		if (rules.price) {
			if (rules.price.required && !price) {
				newErrors.price = { type: 'required' };
			} else {
				// final else clause to clear errors
				newErrors.price = null;
			}
		}

		const newState = {
			...errors,
			...newErrors,
		};
		setErrors(newState);

		const errorCount = Object.keys(newState).filter((err) => newState[err]);
		Object.keys(newState).filter((err) => newState[err]);
		const hasErrors = errorCount && errorCount.length >= 1;

		return !hasErrors;
	};

	//   const { userInfo } = state;

	return status ? (
		<SellerContainer title={'Add Product'}>
			<Card className={classes.section}>
				<List>
					<ListItem>
						<Typography
							component="h1"
							variant="h1"
							className="flex-auto"
						>
							Add Product
						</Typography>
						<Button variant="outlined" color="primary">
							<Link href="/seller/products">
								Back to Products
							</Link>
						</Button>
					</ListItem>
					<ListItem>
						<form onSubmit={submitHandler} className={classes.form}>
							<List>
								<ListItem>
									<TextField
										name="title"
										variant="outlined"
										fullWidth
										id="title"
										label="Product Name"
										value={title}
										onChange={(e, newValue) => {
											setTitle(e.target.value);
										}}
										// inputValue={titleInputValue}
										// inputProps={{ type: 'title' }}
										error={Boolean(errors.title)}
										helperText={
											errors.title
												? errors.title.type ===
												  'minLength'
													? 'Product Name length is more than 1'
													: 'Product Name is required'
												: ''
										}
									/>
								</ListItem>
								<ListItem>
									<Autocomplete
										fullWidth
										options={brands.map(
											(brand) => brand.title
										)}
										value={brand}
										onChange={(e, newValue) => {
											setBrand(newValue);
										}}
										inputValue={brandInputValue}
										onInputChange={(e, newValue) => {
											setBrandInputValue(newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Brand"
												error={Boolean(errors.brand)}
												helperText={
													errors.brand
														? errors.brand.type ===
														  'minLength'
															? 'Brand length is more than 1'
															: 'Brand is required'
														: ''
												}
											/>
										)}
									/>
								</ListItem>
								<ListItem>
									<Autocomplete
										fullWidth
										options={categories.map(
											(category) => category.name
										)}
										value={category}
										onChange={(e, newValue) => {
											setCategory(newValue);
										}}
										inputValue={categoryInputValue}
										onInputChange={(e, newValue) => {
											setCategoryInputValue(newValue);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Category"
												error={Boolean(errors.category)}
												helperText={
													errors.category
														? errors.category
																.type ===
														  'minLength'
															? 'Category length is more than 1'
															: 'Category is required'
														: ''
												}
											/>
										)}
									/>
								</ListItem>
								<ListItem>
									<Grid container spacing={1}>
										<Grid item xs>
											<FormControl fullWidth>
												<TextField
													name="stock"
													variant="outlined"
													type={'number'}
													fullWidth
													id="sellerProductStock"
													// labelId="sellerProductStock"
													label="Stock"
													value={stock}
													onChange={(e, newValue) => {
														setStock(
															e.target.value
														);
													}}
													select
													// inputValue={stockInputValue}
													// inputProps={{ type: 'stock' }}
													error={Boolean(
														errors.stock
													)}
													helperText={
														errors.stock
															? 'Stock is required'
															: ''
													}
												>
													{[...Array(10).keys()].map(
														(num) => (
															<MenuItem
																key={num}
																value={num}
															>
																{num}
															</MenuItem>
														)
													)}
												</TextField>
											</FormControl>
										</Grid>
										<Grid item xs>
											<FormControl fullWidth>
												<TextField
													name="price"
													variant="outlined"
													fullWidth
													id="sellerProductPrice"
													// labelId="sellerProductPrice"
													label="Price"
													value={price}
													onChange={(e, newValue) => {
														const numsOnly =
															e.target.value.replace(
																/[^0-9.]/g,
																''
															);

														if (
															numsOnly.indexOf(
																'.'
															) >= 0
														) {
															setPrice(
																Number(
																	numsOnly
																).toFixed(2)
															);
														} else {
															setPrice(
																Number(numsOnly)
															);
														}
													}}
													error={Boolean(
														errors.price
													)}
													helperText={
														errors.price
															? 'Price is required'
															: ''
													}
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																$
															</InputAdornment>
														),
													}}
												/>
											</FormControl>
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
										value={description}
										onChange={(e, newValue) => {
											setDescription(e.target.value);
										}}
										multiline
										maxRows={4}
										error={Boolean(errors.description)}
										helperText={
											errors.description
												? 'Description is required'
												: ''
										}
									/>
								</ListItem>

								{/* <ListItem>
                  <ControlledAutoComplete
                    control={control}
                    rules={{
                      required: true,
                    }}
                    name="category"
                    freeSolo={true}
                    options={categories.map((category) => category.name)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category" 
                        error={Boolean(errors.category)}
                        helperText={
                          errors.category
                            ? errors.category.type === 'minLength'
                              ? 'Category length is more than 1'
                              : 'Category is required'
                            : ''
                        }
                      />
                    )}
                    defaultValue={null}
                  />
                </ListItem> */}
								{/* <ListItem>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={categories.map((category) => category.name)}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                  />
                </ListItem> */}
								<ListItem>
									<Button
										variant="contained"
										type="submit"
										fullWidth
										color="primary"
									>
										Add
									</Button>
								</ListItem>
							</List>
						</form>
					</ListItem>
				</List>
			</Card>
		</SellerContainer>
	) : (
		<Loading />
	);
}

AddProduct.auth = {
	role: 'seller',
	loading: <LoadingPage />,
	unauthorized: '/',
};

export default AddProduct;
