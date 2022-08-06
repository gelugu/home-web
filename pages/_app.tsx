import { useEffect, useState } from "react";
import Head from "next/head";
import { AppProps } from "next/dist/shared/lib/router/router";
import { Center, ChakraProvider, CircularProgress } from "@chakra-ui/react";

import { AppContextProvider } from "../src/app/context";
import { theme } from "../src/app/config";

function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (window.localStorage) setToken(localStorage.getItem("token") || "");
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link key={0} rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        {loading ? (
          <Center h="100vh">
            <CircularProgress isIndeterminate />
          </Center>
        ) : (
          <AppContextProvider
            token={token}
            setToken={setToken}
            error={() => ""}
            success={() => ""}
          >
            <Component {...pageProps} />
          </AppContextProvider>
        )}
      </ChakraProvider>
    </>
  );
}

export default MyApp;
