import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { AppProps } from "next/dist/shared/lib/router/router";
import {
  Center,
  ChakraProvider,
  CircularProgress,
  useMediaQuery,
} from "@chakra-ui/react";

import { AppContext, AppContextProvider } from "../src/app/context";
import { mobileScreen, routes, theme } from "../src/app/config";
import { useRouter } from "next/router";
import { useApi } from "../src/app/hooks";
import { DesktopLayout, MobileLayout } from "../src/ui/layouts";

function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps): JSX.Element {
  const [isMobile] = useMediaQuery(mobileScreen);
  const [token, setToken] = useState("");
  const { error } = useContext(AppContext);
  const { push, asPath } = useRouter();
  const { status } = useApi();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    status().catch(({ message }) => {
      error("Token invalid", message);
      if (message.includes("401") && asPath !== routes.registration)
        push(routes.login);
    });

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
            {isMobile ? (
              <MobileLayout children={<CircularProgress isIndeterminate />} />
            ) : (
              <DesktopLayout children={<CircularProgress isIndeterminate />} />
            )}
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
