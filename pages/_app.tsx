import { AuthProvider } from "@/hooks/useAuth";
import { modalStore } from "@/redux/modalStore";
import "@/styles/globals.css";
// import "@/styles/authen.css";
//import "@/styles/book.css";
// import "@/styles/features.css";
// import "@/styles/footer.css";
// import "@/styles/plan.css";
// import "@/styles/progress-bar.css";
// import "@/styles/reviews.css";
// import "@/styles/search-bar.css";
// import "@/styles/settings.css";
// import "@/styles/sidebar.css";
// import "@/styles/skeleton.css";
// import "@/styles/responsive-design.css";
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
