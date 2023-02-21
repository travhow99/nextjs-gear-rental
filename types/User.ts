type User = {
	id?: string;
	name: string;
	email: string;
	image?: string;
	role?: string;
	seller?: boolean;
	createdAt?: Date;
};

export default User;
