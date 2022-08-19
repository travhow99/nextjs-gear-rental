type Product = {
	_id: string;
	product: string;
	// user: User

	stock: number;
	category: string;
	rentalMin: number;
	title: string;
	brand: string;
	gender: string;
	size: string;
	condition: string;
	price: number;
	description: string;
	keyword: string;
	slug: string;
	images: Array<object>;
	rentals: Array<object>;
	rental?: {
		startDate: string;
		endDate: string;
	};
	blockOuts: Array<object>;
};

export default Product;
