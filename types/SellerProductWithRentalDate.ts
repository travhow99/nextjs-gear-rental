import ProductImage from './ProductImage';
import SellerProduct, { SellerProductWithImages } from './SellerProduct';

type SellerProductWithRentalDateOrCartItemDate = SellerProductWithImages & {
	startDate?: Date;
	endDate?: Date;
	dateOut?: Date;
	dateDue?: Date;
};

export default SellerProductWithRentalDateOrCartItemDate;
