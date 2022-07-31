import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import ChatIcon from "@mui/icons-material/Chat";

import { Input, Spacer } from "../../components";

import { useHttp } from "../../hooks/http";
import { routes } from "../../config";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { status, registerBot, registerChat, getChat } = useHttp();

  const [token, setToken] = useState<string>("");
  const [tokenConfirmed, setTokenConfirmed] = useState<boolean>(false);

  const [chat, setChat] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    status().catch(({ response }) => {
      const { data } = response;
      if (data.message === "No telegram bot token") {
      }
      if (data.message === "No telegram chat id") {
      }
    });
  }, []);

  const sendToken = useCallback(() => {
    if (token === "") return;

    setLoading(true);

    registerBot(token)
      .then(({ data }) => {
        setUsername(data.username);
        setChat(data.chat);
        setTokenConfirmed(true);
      })
      .catch(({ response }) => {
        const { data } = response;
        enqueueSnackbar(data.message, { variant: "error" });
        setTokenConfirmed(false);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const confirmUsername = useCallback(() => {
    registerChat(chat)
      .then(() => {
        push(routes.login);
      })
      .catch(({ response }) => {
        const { data } = response;
        enqueueSnackbar(data.message, { variant: "error" });
      });
  }, [chat]);

  const getLastChatId = useCallback(() => {
    setLoading(true);

    getChat()
      .then(({ data }) => {
        setUsername(data.username);
        setChat(data.chat);
      })
      .catch(({ response }) => {
        const { data } = response;
        enqueueSnackbar(data.message, { variant: "error" });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {/* ToDo: handle center component */}
        <Spacer xs={12} />
        <Spacer xs={12} />
        <Spacer xs={12} />
        <Spacer xs={12} />
        <Spacer xs={12} />
        <Spacer xs={12} />

        <Grid item xs={1}>
          <TelegramIcon
            fontSize="large"
            color={tokenConfirmed ? "success" : "inherit"}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            value={token}
            label="Telegram bot token"
            // ToDo: bug - onChange don\'t work when paste token
            onChange={(e) => setToken(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={sendToken}>Connect</Button>
        </Grid>
        <Spacer xs={2} />

        {tokenConfirmed && (
          <>
            <Grid item xs={2}>
              <ChatIcon color="inherit" />
            </Grid>
            <Grid item xs={3}>
              <Typography>Are you {username}?</Typography>
            </Grid>
            <Grid item xs={3}>
              {loading ? (
                <CircularProgress />
              ) : (
                <ButtonGroup>
                  <Button onClick={confirmUsername}>Yes</Button>
                  <Button onClick={getLastChatId}>No</Button>
                </ButtonGroup>
              )}
            </Grid>
            <Spacer xs={4} />
          </>
        )}
      </Grid>
    </Container>
  );
}
