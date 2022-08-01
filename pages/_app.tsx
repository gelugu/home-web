import Head from "next/head";
import { AppProps } from "next/dist/shared/lib/router/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import { AppContextProvider } from "../context/app";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps): JSX.Element {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: yellow,
    },
  });

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("Window updated");
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? (
          <LinearProgress />
        ) : (
          <SnackbarProvider maxSnack={5}>
            <AppContextProvider
              token={token}
              setToken={setToken}
              error={() => ""}
            >
              <Component {...pageProps} />
            </AppContextProvider>
          </SnackbarProvider>
        )}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
