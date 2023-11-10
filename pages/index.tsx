import Authen from "@/components/Authen";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Landing from "@/components/home/Landing";
import Numbers from "@/components/home/Numbers";
import Reviews from "@/components/home/Reviews";
import { RootState } from "@/redux/modalStore";
import Head from "next/head";
import { useSelector } from "react-redux";

export default function Home() {
  const modal = useSelector((state: RootState) => state.modal.value);

  return (
    <div>
      <Head>
        <title>Summarist</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main>
        {modal && <Authen />}
        <Header />
        <Landing />
        <Features />
        <Reviews />
        <Numbers />
        <Footer />
      </main>
    </div>
  );
}
