import { Stripe, loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

/**
 * @todo make async?
 */
/* const getStripe = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const loadStripeScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/stripe');

      console.log('got:', clientId);

      setStripePromise(loadStripe(clientId));
    };
    loadStripeScript();
  }, []);
}; */

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
