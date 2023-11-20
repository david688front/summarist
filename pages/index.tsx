import Authen from "@/components/Authen";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Landing from "@/components/home/landing";
import Numbers from "@/components/home/numbers";
import Reviews from "@/components/home/reviews";
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
