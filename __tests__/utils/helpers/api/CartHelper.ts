import add from 'date-fns/add';
import addDays from 'date-fns/addDays';
import { prismaMock } from '../../../../singleton';
import CartItem from '../../../../types/CartItem';
import SellerProduct from '../../../../types/SellerProduct';
import {
	productExistsInCart,
	productHasConflictingDate,
} from '../../../../utils/helpers/api/CartHelper';

const mockProduct: SellerProduct = {
	id: '12345',
	brand: 'Patagonia',
	category: 'fishing',
	condition: 'good',
	description: 'quality fly fishing waders',
	gender: 'M',
	images: [],
	imageUrl: 'string',
	keyword: 'fishing waders',
	price: 15,
	product: '',
	rentalMin: 1,
	size: 'M',
	slug: 'patagonia-waders-men',
	softDelete: false,
	stock: 1,
	title: 'Guidefoot Waders',
	userId: '12345',
	blockOuts: [],
	rentals: [],
	createdAt: new Date(),
	updatedAt: new Date(),
};

const mockCartItem: CartItem = {
	product: mockProduct,
	cartId: '1111',
	productId: '12345',
	startDate: new Date(),
	endDate: new Date(),
};

const today = new Date();
const tomorrow = addDays(today, 1);

const mockCartItem2: CartItem = {
	product: mockProduct,
	cartId: '1111',
	productId: '12345',
	startDate: tomorrow,
	endDate: tomorrow,
};

test('should assert productExistsInCart ', () => {
	expect(productExistsInCart([mockCartItem], mockProduct.id)).toEqual(true);
});

test('should assert productHasConflictingDate', () => {
	expect(productHasConflictingDate([mockCartItem], mockCartItem)).toEqual(
		true
	);
});

test('should assert productHasConflictingDate', () => {
	expect(productHasConflictingDate([mockCartItem2], mockCartItem)).toEqual(
		false
	);
});

test('should assert productHasConflictingDate', () => {
	expect(productHasConflictingDate([mockCartItem], mockCartItem2)).toEqual(
		false
	);
});

/* test('should update a users name ', async () => {
	const user = {
		id: 1,
		name: 'Rich Haines',
		email: 'hello@prisma.io',
	};

	prismaMock.user.update.mockResolvedValue(user);

	await expect(updateUsername(user)).resolves.toEqual({
		id: 1,
		name: 'Rich Haines',
		email: 'hello@prisma.io',
	});
});

return;

test('should fail if user does not accept terms', async () => {
	const user = {
		id: 1,
		name: 'Rich Haines',
		email: 'hello@prisma.io',
		acceptTermsAndConditions: false,
	};

	prismaMock.user.create.mockRejectedValue(
		new Error('User must accept terms!')
	);

	await expect(createUser(user)).resolves.toEqual(
		new Error('User must accept terms!')
	);
}); */
