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
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';
import LoadingPage from '../../../components/pages/LoadingPage';
import BlockOutForm from '../../../components/seller/BlockOutForm';
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

function SellerProduct({ params }) {
	const sellerProductId = params.id;
	const [loading, setLoading] = useState(false);

	const [category, setCategory] = useState(false);
	const [stock, setStock] = useState(false);
	const [rentalMin, setRentalMin] = useState(false);
	const [title, setTitle] = useState(false);
	const [brand, setBrand] = useState(false);
	const [brandInputValue, setBrandInputValue] = useState('');
	const [categoryInputValue, setCategoryInputValue] = useState('');
	const [gender, setGender] = useState(false);
	const [size, setSize] = useState(false);
	const [condition, setCondition] = useState(false);
	const [price, setPrice] = useState(false);
	const [description, setDescription] = useState(false);
	const [keyword, setKeyword] = useState(false);
	const [images, setImages] = useState(false);
	const [blockOuts, setBlockOuts] = useState(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [product, setProduct] = useState({});

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
		fetchSellerProduct();
	}, [brands, categories]);

	const fetchSellerProduct = async () => {
		try {
			const { data } = await axios.get(
				`/api/sellerProducts/${sellerProductId}`
			);

			console.log('got data', data);

			/**
			 * @todo this should use useReducer or all one state
			 * Currently re-rendering for each setState call
			 */
			setCategory(data.category);
			setStock(data.stock);
			setRentalMin(data.rentalMin);
			setTitle(data.title);
			setBrand(data.brand);
			setGender(data.gender);
			setSize(data.size);
			setCondition(data.condition);
			setPrice(data.price);
			setDescription(data.description);
			setKeyword(data.keyword);
			setImages(data.images);
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
			});

			setLoading(false);
		} catch (err) {
			console.log('got err!', err);
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
			console.log('got err!', err);
			enqueueSnackbar(getError(err), { variant: 'error' });
		}
	};

	const onImageUpload = (data) => {
		console.log('img upload data', data);

		const updatedImages = [...images, data];
		setImages(updatedImages);
	};

	const checkForChange = (name, val) => {
		return val != product[name];
	};

	return status ? (
		<SellerContainer title={'Products'}>
			<Card className={classes.section}>
				{title ? (
					<List>
						<ListItem>
							<Typography component="h1" variant="h1">
								{title}
							</Typography>
						</ListItem>
						<ListItem>
							<Grid container spacing={1}>
								{/**
								 * @todo upgrade to using image list
								 * https://mui.com/components/image-list/
								 */}
								{images?.length >= 1 &&
									images.map((image) => (
										<Grid key={image._id} item xs={3}>
											<Image
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
								value={title || ''}
								variant="outlined"
								onChange={(e, newValue) => {
									setTitle(e.target.value);
								}}
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
										value={stock || ''}
										type={'number'}
										variant="outlined"
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);

											setStock(e.target.value);
										}}
										onBlur={handleBlur}
									/>
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										id="rentalMin"
										name="rentalMin"
										label="Rental Min"
										value={rentalMin || ''}
										type={'number'}
										variant="outlined"
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);

											setRentalMin(e.target.value);
										}}
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
										value={brand || null}
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);

											setBrand(newValue);
										}}
										inputValue={brandInputValue}
										onInputChange={(e, newValue) => {
											setBrandInputValue(newValue);
											console.log(
												'onchange input',
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
										value={category || null}
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);
											setCategory(newValue);
										}}
										inputValue={categoryInputValue}
										onInputChange={(e, newValue) => {
											setCategoryInputValue(newValue);
											console.log(
												'onchange input',
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
										value={gender || ''}
										variant="outlined"
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);

											setGender(e.target.value);
										}}
										onBlur={handleBlur}
									/>
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										id="size"
										name="size"
										label="Size"
										value={size || ''}
										type={'number'}
										variant="outlined"
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);

											setSize(e.target.value);
										}}
										onBlur={handleBlur}
									/>
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										id="condition"
										name="condition"
										label="Condition"
										value={condition || ''}
										variant="outlined"
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);

											setCondition(e.target.value);
										}}
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
										value={price || ''}
										type={'number'}
										variant="outlined"
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);

											setPrice(e.target.value);
										}}
										onBlur={handleBlur}
									/>
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										id="keyword"
										name="keyword"
										label="Keyword"
										value={keyword || ''}
										variant="outlined"
										onChange={(e, newValue) => {
											console.log(
												'onchange',
												e,
												newValue
											);

											setKeyword(e.target.value);
										}}
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
								value={description || ''}
								onChange={(e, newValue) => {
									setDescription(e.target.value);
								}}
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
			<Grid container spacing={1}>
				<Grid item xs>
					<BlockOutForm
						updateBlockOuts={setBlockOuts}
						productId={sellerProductId}
						blockOuts={blockOuts}
					/>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
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
