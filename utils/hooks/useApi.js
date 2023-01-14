import { useState } from 'react';

/**
 * Src https://betterprogramming.pub/clean-api-call-with-react-hooks-3bd6438a375a
 */
export default (apiCall) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);

    try {
      const result = await apiCall(...args);
      setData(result.data);
    } catch (err) {
      setError(err.message || 'Unexpected Error!');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
