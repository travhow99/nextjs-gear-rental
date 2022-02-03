import { getSession } from 'next-auth/react';

const isSeller = async (req, res, next) => {
  const session = await getSession({ req });

  if (session) {
    const user = session.user;
    if (user) {
      req.user = user;

      if (user.seller || user.role === 'admin') {
        next();
      } else {
        res
          .status(401)
          .send({ message: 'You are not allowed to see this page!' });
      }
    }
  } else {
    res.status(401).send({ message: 'Session is not valid' });
  }
};

export { isSeller };
