import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Script from "next/script";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import AuthContextProvider from "@/context";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

const inter = Inter({ subsets: ["latin"] });
const supabaseUrl = "https://qgkjakomwapzuhvnrvgr.supabase.co";
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
  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: true,
  };

  const theme = extendTheme({ config });
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt="script"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <SpeedInsights />
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <div className={inter.className}>
              <Component {...pageProps} />
            </div>
          </AuthContextProvider>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
}
