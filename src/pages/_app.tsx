import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  Box,
  Flex,
} from "@chakra-ui/react";

// Declare googleTranslateElementInit on the window object
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (options: object, container: string | HTMLElement): void;
          InlineLayout: {
            SIMPLE: string;
          };
        };
      };
    };
  }
}
import { Inter } from "next/font/google";
import Script from "next/script";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import AuthContextProvider from "@/context";
import Head from "next/head";

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
    initialColorMode: "light",
    useSystemColorMode: true,
  };

  const theme = extendTheme({ config });

  // Initialize Google Translate
  useEffect(() => {
    const addGoogleTranslate = () => {
      if (typeof window !== "undefined" && window.google) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,gu,fr,de,es", // Add your desired languages
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
    window.googleTranslateElementInit = addGoogleTranslate;
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2754274313849445"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <div className={inter.className}>
              <Flex direction="column" align="center" p={4}>
                {/* Google Translate Widget */}
                <Box
                  id="google_translate_element"
                  mb={4}
                  p={2}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="sm"
                  width="100%"
                  maxWidth="400px"
                ></Box>
                <Component {...pageProps} />
              </Flex>
            </div>
          </AuthContextProvider>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
}
