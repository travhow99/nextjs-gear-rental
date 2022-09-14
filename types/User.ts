type User = {
	_id?: String;
	name: String;
	email: String;
	image?: String;
	role?: String;
	seller?: Boolean;
	createdAt?: Date;
};

export default User;
