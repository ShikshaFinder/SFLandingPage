import Head from "next/head";
// import { Inter } from "next/font/google";
import Hero from "../components/hero";
import Waitlist from "../components/Waitlist";
import Footer from "../components/footer";

import Companyreview from "../components/companyreview";

// import Parentscontent from "./components/Parentscontent";
// const inter = Inter({ subsets: ["latin"] });
import { useAuthContext } from "@/context";


export default function Home() {
  const { user } = useAuthContext();
  return (
    <>
      <div>Current user : {user.email}</div>

      <Head>
        <title>ShikshaFinder</title>
        <meta
          name="ShikshaFinder"
          content="Schools near me,schools,how to find best schools for your child?,what is the best way of marketing your educational platform?,ShikshaFinder,top 10 schools in Gujrat"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Hero />
      <Waitlist />
      <Companyreview />
      <Footer />
    </>
  );
}
