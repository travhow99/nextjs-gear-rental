import { NextApiRequest } from 'next';
import User from '../User';

type NextApiRequestWithUser = NextApiRequest & { user?: User };

export default NextApiRequestWithUser;
