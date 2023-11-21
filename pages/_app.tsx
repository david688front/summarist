import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthProvider } from "@/hooks/useAuth";
import { modalStore } from "@/store/modalStore";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={modalStore}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}
