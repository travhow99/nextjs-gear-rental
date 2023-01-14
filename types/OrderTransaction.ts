type TransactionType = 'purchase' | 'refund';

type OrderTransaction = {
	orderId: string;
	transactionId: string;
	type: TransactionType;
	note: string;
};

export default OrderTransaction;
