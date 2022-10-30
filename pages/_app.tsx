import { useState } from "react";
import Head from "next/head";
import { AppProps } from "next/dist/shared/lib/router/router";
import { ChakraProvider } from "@chakra-ui/react";

import {
  AuthContextProvider,
  AppContextProvider,
  TracksContextProvider,
} from "../src/app/context";
import { theme } from "../src/app/config";
import { emptyTrack } from "../src/app/interfaces";

function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps): JSX.Element {
  const [token, setToken] = useState("");

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link key={0} rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        <AppContextProvider error={() => null} success={() => null}>
          <AuthContextProvider token={token} setToken={setToken}>
            <TracksContextProvider
              tracks={[]}
              setTracks={() => null}
              currentTrack={emptyTrack}
              setCurrentTrack={() => null}
              fetchTasks={() => null}
            >
              <Component {...pageProps} />
            </TracksContextProvider>
          </AuthContextProvider>
        </AppContextProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
