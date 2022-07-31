import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { Container, Grid } from "@mui/material";

import { Input } from "../../components";

import { useHttp } from "../../hooks/http";
import { routes } from "../../config";
import { AppContext } from "../../context/app";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { setToken } = useContext(AppContext);
  const { status, sendCode, login } = useHttp();

  const [code, setCode] = useState<string>("");

  useEffect(() => {
    status().catch(({ response }) => {
      const { data } = response;
      if (
        data.message === "No telegram bot token" ||
        data.message === "No telegram chat id"
      )
        push(routes.registration);
    });
    sendCode().catch(({ response }) => {
      const { data } = response;
      enqueueSnackbar(data.message, { variant: "error" });
    });
  }, []);

  useEffect(() => {
    if (code.length === 4)
      login({ code })
        .then(({ data }) => {
          setToken(data.token);
          push(routes.root);
        })
        .catch(({ message }) => {
          enqueueSnackbar(message, { variant: "error" });
        });
  }, [code]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </Grid>
      </Grid>
    </Container>
  );
}
