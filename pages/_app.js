import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
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
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <SessionProvider session={session}>
            {console.log(Component.auth, 'auth??', 'sesh?', pageProps.session)}
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </SessionProvider>
        </PayPalScriptProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;

  useEffect(() => {
    if (session) console.log('sesshhhhh', session, status);
    if (status === 'loading') return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    console.log('i am user, load my auth children');
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
