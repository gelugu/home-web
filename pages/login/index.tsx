import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import {
  Container,
  Grid,
} from "@mui/material";

import { Input } from "../../components";

import { useHttp } from "../../hooks/http";
import { routes } from "../../config";
import { AppContext } from "../../context/app";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { setToken } = useContext(AppContext);
  const { login } = useHttp();

  const [code, setCode] = useState<string>("");

  useEffect(() => {
    if (code.length === 4)
      login({ code })
        .then(({data}) => {
          setToken && setToken(data.token)
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
