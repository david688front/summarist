import { AuthProvider } from "@/hooks/useAuth";
import { modalStore } from "@/redux/modalStore";
import "@/styles/globals.css";
import "@/styles/styles.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={modalStore}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}
