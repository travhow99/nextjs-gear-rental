import { getSession } from 'next-auth/react';

const isSeller = async (req, res, next) => {
  const session = await getSession({ req });

  if (
    session &&
    session.user &&
    (session.user.role === 'seller' || session.user.role === 'admin')
  ) {
    req.user = session.user;
    next();
  } else {
    res.status(401).send({ message: "You don't belong here!" });
  }
};

export { isSeller };
