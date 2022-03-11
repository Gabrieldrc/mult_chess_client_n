import "@styles/globals.sass";
import type { AppProps } from "next/app";
import MainLayout from "@components/MainLayout/MainLayout";
import { Provider } from "react-redux";
import { store } from "core/redux/store";
import { getWS, WebSocketContext } from "core/providers/SocketProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WebSocketContext.Provider value={getWS()}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </WebSocketContext.Provider>
    </Provider>
  );
}

export default MyApp;
