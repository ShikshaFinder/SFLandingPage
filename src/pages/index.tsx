import Head from "next/head";
// import { Inter } from "next/font/google";
import Hero from "../components/hero";
import Footer from "../components/footer";
import { NextSeo } from "next-seo";

import Companyreview from "../components/companyreview";

// import Parentscontent from "./components/Parentscontent";
// const inter = Inter({ subsets: ["latin"] });
import { useAuthContext } from "@/context";



type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>; // You might want to define a type for this array
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};
export default function Home() {
  const { user } = useAuthContext() as { user: UserType };
  return (
    <>
      <div>Current user : {user.email}</div>

      <NextSeo
        title="Shiksha Finder"
        description="Show case the quality of education"
        openGraph={{
          url: "https://shikshafinder.com/",
          title: "Let's promote Quality of Education",
          description: "  इमानदार स्कूल की पहचान",
          images: [
            {
              url: "https://postimg.cc/nXqxc8CG",
              alt: "Shiksha Finder == happy students",
            },
          ],
          site_name: "shikshafinder.com",
          type: "website",
        }}
      />
      <Head>
        <meta
          name="ShikshaFinder"
          content="Shiksha Finder,schools,how to find best schools for your child?,what is the best way of marketing your educational platform?,schools near me"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Hero />

      <Companyreview />
      <Footer />
    </>
  );
}
