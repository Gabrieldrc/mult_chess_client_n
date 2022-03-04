import "../styles/globals.sass";
import type { AppProps } from "next/app";
import MainLayout from "../components/MainLayout/MainLayout";
import { Provider } from "react-redux";
import { store } from "core/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}

export default MyApp;
