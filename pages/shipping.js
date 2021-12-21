import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Store } from '../utils/store';

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { data: session } = useSession();

  if (!session) {
    // router.push('/login?redirect=/shipping');
    signIn();
  }

  return <div>Shipping</div>;
}
