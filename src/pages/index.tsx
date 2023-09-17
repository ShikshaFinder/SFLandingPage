import Head from "next/head";
// import Image from 'next/image'
import { Inter } from "next/font/google";
// import styles from '@/styles/Home.module.css'\
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Waitlist from "./components/Waitlist"; 
import Aboutus from "./components/aboutus";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ShikshaFinder</title>
        <meta
          name="description"
          content="Choose Right to make your future bright"
        />
       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      
      </Head>
      <Navbar />
      <Hero />
      <Waitlist />
      <Aboutus />
    </>
  );
}
