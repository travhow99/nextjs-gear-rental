import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import '../styles/global.css';
import { SnackbarProvider } from 'notistack';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </StoreProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
}
