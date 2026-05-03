import { Provider } from "react-redux";
import { Layout } from "../components/layout/Layout";
import store from "../Store";
import "../styles/output.css";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;