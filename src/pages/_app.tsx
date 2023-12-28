import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Script from "next/script";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import AuthContextProvider from "@/context";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
const supabaseUrl = "https://wexrtlzodmpxquqvjxlo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({ supabaseUrl, supabaseKey })
  );

  return (
    <>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <SpeedInsights />
        <ChakraProvider>
          <AuthContextProvider>
            <div className={inter.className}>
             
                <Navbar />
             
              <Component {...pageProps} />
            </div>
          </AuthContextProvider>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
}
