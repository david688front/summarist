import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "@/store/modalStore";
import Numbers from "@/components/home/Numbers";
import Authen from "@/components/Authen";
import Features from "@/components/home/Features";
import Reviews from "@/components/home/Reviews";
import Header from "@/components/home/Header";
import Landing from "@/components/home/Landing";
import Footer from "@/components/home/Footer";


export default function Home() {
  const modal = useSelector((state: RootState) => state.modal.value);
  return (
    <div>
      <Head>
        <title>Summarist</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
        {modal && <Authen />}
        <Header />
        <Landing />
        <Features />
        <Reviews />
        <Numbers />
        <Footer />
    </div>
  );
}