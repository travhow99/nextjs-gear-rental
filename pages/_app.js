import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import '../styles/global.css';
import { SnackbarProvider } from 'notistack';
import LoadingPage from '../components/pages/LoadingPage';
import UnauthorizedPage from '../components/pages/UnauthorizedPage';
import { useRouter } from 'next/router';

import reduxStore from '../redux/store';
import { Provider } from 'react-redux';

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

  console.log('redux store', reduxStore);

  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Provider store={reduxStore}>
        <PayPalScriptProvider deferLoading={true}>
          <SessionProvider session={session}>
            {Component.auth ? (
              Component.auth.role === 'admin' ? (
                <Admin redirect={Component.auth.unauthorized}>
                  <Component {...pageProps} />
                </Admin>
              ) : Component.auth.role === 'seller' ? (
                <Seller redirect={Component.auth.redirect}>
                  <Component {...pageProps} />
                </Seller>
              ) : (
                <Auth redirect={Component.auth.redirect}>
                  <Component {...pageProps} />
                </Auth>
              )
            ) : (
              <Component {...pageProps} />
            )}
          </SessionProvider>
        </PayPalScriptProvider>
      </Provider>
    </SnackbarProvider>
  );
}

/**
 * Authentication pattern from next.js Custom Client Session Handling​ Docs & github issue https://github.com/nextauthjs/next-auth/issues/1210
 *
 * Authenticated pages must have Component.auth variable === TRUE to require authentication process.
 */
function Auth({ children, redirect }) {
  console.log('redirect?', redirect);
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;

  // console.log('i am auth,', )
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    /**
     * @todo Show Restricted / Members area page with login or home button
     */
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    console.log('i am user, load my auth children');
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <LoadingPage />;
}

const Admin = ({ children, redirect }) => {
  console.log('redirect?', redirect);
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;

  const isAdmin = isUser && session.user.role === 'admin';
  // console.log('i am auth,', )
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    /**
     * @todo Show Restricted / Members area page with login or home button
     */
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    if (isAdmin) {
      console.log('i am admin, load my auth children');
      return children;
    } else {
      router.push(redirect);
      // return <UnauthorizedPage redirect={redirect} />;
    }
  }

  console.log('not user,', children);
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <LoadingPage />;
};

const Seller = ({ children, redirect }) => {
  console.log('redirect?', redirect);
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;

  const isSeller =
    isUser && (session.user.role === 'seller' || session.user.role === 'admin');
  // console.log('i am auth,', )
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    /**
     * @todo Show Restricted / Members area page with login or home button
     */
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    if (isSeller) {
      console.log('i am Seller, load my auth children');
      return children;
    } else {
      router.push(redirect);
      // return <UnauthorizedPage redirect={redirect} />;
    }
  }

  console.log('not user,', children);
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <LoadingPage />;
};
