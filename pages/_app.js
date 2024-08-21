// pages/_app.js

import CategoryNav from '@/components/CategoryNav';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <>
        <CategoryNav />
        <Component {...pageProps} />
      </>
    </SessionProvider>
  );
}

export default MyApp;
