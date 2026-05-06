import "../styles/globals.css";
import { Provider } from "react-redux";
import LayoutClient from "@/components/layout/LayoutClient";
import store from "@/Store";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LayoutClient>
        <Component {...pageProps} />
      </LayoutClient>
    </Provider>
  );
}
