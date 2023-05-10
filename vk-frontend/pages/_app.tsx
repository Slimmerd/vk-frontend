import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/layout/MainLayout';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { NextPage } from 'next';
import AuthLayout from '@/components/layout/AuthLayout';


type NextPageWithLayout = NextPage & {
  getLayout?: typeof MainLayout | typeof AuthLayout
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const GetLayout = Component.getLayout || MainLayout;

  return (
    <Provider store={store}>
      <GetLayout>
        <Component {...pageProps} />
      </GetLayout>
    </Provider>
  );
}
