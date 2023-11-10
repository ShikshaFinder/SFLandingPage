import Head from "next/head";
import { Inter } from "next/font/google";
// import Navbar from "./components/navbar";
// import Hero from "./components/hero";
import Waitlist from "./components/Waitlist";
import Aboutus from "./components/aboutus";
// import Card from "./components/card";
import Slidebar from "./sidebar";

// import Parentscontent from "./components/Parentscontent";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ShikshaFinder</title>
        <meta
          name="ShikshaFinder"
          content="Choose Right to make your future bright,schools,how to find best schools for your child?,what is the best way of marketing your educational platform?,ShikshaFinder"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Slidebar />
      {/* <Navbar /> */}
      {/* <Hero /> */}
      <Waitlist />
      {/* <Aboutus /> */}
     {/* <card/> */}
      {/* <Parentscontent/> */}
    </>
  );
}
