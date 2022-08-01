import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { Card, CardContent } from "@mui/material";

import { Center, Input } from "../../components";

import { useHttp } from "../../hooks/http";
import { routes } from "../../config";
import { AppContext } from "../../context/app";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { setToken, error } = useContext(AppContext);
  const { status, sendCode, login } = useHttp();

  const [code, setCode] = useState<string>("");

  useEffect(() => {
    status().catch(({ response }) => {
      if (
        response.data === "No telegram bot token" ||
        response.data === "No telegram chat id"
      )
        push(routes.registration);
    });
    sendCode().catch(({ response }) => {
      error(response.data);
    });
  }, []);

  useEffect(() => {
    if (code.length === 4)
      login({ code })
        .then(({ data }) => {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          push(routes.root);
        })
        .catch(({ response }) => {
          error(response.data);
        });
  }, [code]);

  return (
    <Center>
      <Card>
        <CardContent>
          <Input
            value={code}
            label="Invitation code"
            onChange={(e) => setCode(e.target.value)}
          />
        </CardContent>
      </Card>
    </Center>
  );
}
