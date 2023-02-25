import ProductImage from './ProductImage';
import SellerProduct from './SellerProduct';

type SellerProductWithRentalDateOrCartItemDate = SellerProduct & {
	startDate?: Date;
	endDate?: Date;
	dateOut?: Date;
	dateDue?: Date;
};

export default SellerProductWithRentalDateOrCartItemDate;
