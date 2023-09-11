import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    // <AuthContextProvider>
    <ChakraProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
    // </AuthContextProvider>
  );
}
