import next from 'next';
import { getSession } from 'next-auth/react';

const isAuth = async (req, res, next) => {
  const session = await getSession({ req });

  if (session) {
    req.user = session.user;
    next();
  } else {
    res.status(401).send({ message: 'Session is not valid' });
  }
};

export { isAuth };
