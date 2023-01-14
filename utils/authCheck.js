import { getSession } from 'next-auth/react';

// Conditional Auth check to add session user to request if present, and allow request to continue even if the session user does not exist (not logged in), to allow for non-users to see routes
const authCheck = async (req, res, next) => {
	const session = await getSession({ req });

	if (session) {
		req.user = session.user;
	}

	next();
};

export { authCheck };
