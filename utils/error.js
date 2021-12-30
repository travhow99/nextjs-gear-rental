import db from './db';

const getError = (err) => {
  console.log('get error', err.response, err.response.data.message);
  const result =
    err.response?.data && err.response.data?.message
      ? err.response.data.message
      : err.message;

  return result;
};

const onError = async (err, req, res, next) => {
  await db.disconnect();
  res.status(500).send({ message: err.toString() });
};

export { getError, onError };
