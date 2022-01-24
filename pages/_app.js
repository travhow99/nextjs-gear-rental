import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import '../styles/global.css';
import { SnackbarProvider } from 'notistack';
import LoadingPage from '../components/pages/LoadingPage';
import UnauthorizedPage from '../components/pages/UnauthorizedPage';
import { useRouter } from 'next/router';
import { AdminStoreProvider } from '../utils/admin/AdminStore';

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
            {Component.auth ? (
              Component.auth.role === 'admin' ? (
                <Admin redirect={Component.auth.unauthorized}>
                  <AdminStoreProvider>
                    <Component {...pageProps} />
                  </AdminStoreProvider>
                </Admin>
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
      </StoreProvider>
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
