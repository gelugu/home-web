import Head from "next/head";
import { AppProps } from "next/dist/shared/lib/router/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

import { AppContextProvider } from "../context/app";

function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps): JSX.Element {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link key={0} rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppContextProvider token={undefined}>
          <CssBaseline />
          <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
