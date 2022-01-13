import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/store';
import axios from 'axios';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          title: 'Example Order',
          amount: props.total,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  const handleSubmit = async (event) => {
    /* event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    }); */
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {/* <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button> */}
    </form>
  );
};

const CheckoutWrapper = (props) => {
  const { state, dispatch } = useContext(Store);
  const [stripePromise, setStripePromise] = useState(null);

  const { paySuccess, payError } = state;

  useEffect(() => {
    if (paySuccess) {
      dispatch({ type: 'PAY_SUCCESS' });
    } else {
      /**
       * @todo Use IFEE instead?
       */
      const loadStripeScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/stripe');

        console.log('got:', clientId);

        setStripePromise(loadStripe(clientId));
      };
      loadStripeScript();
    }
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm total={props.total} />
    </Elements>
  );
};

export default CheckoutWrapper;
