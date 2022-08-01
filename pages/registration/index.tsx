import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import ChatIcon from "@mui/icons-material/Chat";

import { Center, Input, Spacer } from "../../components";

import { useHttp } from "../../hooks/http";
import { routes } from "../../config";
import { AppContext } from "../../context/app";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { error } = useContext(AppContext);
  const { status, registerBot, registerChat, getChat } = useHttp();

  const [token, setToken] = useState<string>("");
  const [tokenConfirmed, setTokenConfirmed] = useState<boolean>(false);

  const [chat, setChat] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    status().catch(({ response }) => {
      if (response.data === "No telegram bot token") {
        setTokenConfirmed(false);
      }
      if (response.data === "No telegram chat id") {
        setTokenConfirmed(true);
        setLoading(true);
        getLastChatId();
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
        error(data.message);
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
        error(data.message);
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
        error(data.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Center>
      <Card>
        {tokenConfirmed ? (
          <>
            {username && (
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <ChatIcon color="inherit" />
                  <Typography>Are you {username}?</Typography>
                  <ButtonGroup>
                    <Button onClick={confirmUsername}>Yes</Button>
                    <Button onClick={getLastChatId}>No</Button>
                  </ButtonGroup>
                </Stack>
              </CardContent>
            )}
            <CardContent>
              <Typography>
                Please, send a message to your bot to help as identify your chat
                id.
              </Typography>
            </CardContent>
          </>
        ) : (
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TelegramIcon
                fontSize="large"
                color={tokenConfirmed ? "success" : "inherit"}
              />
              <Input
                value={token}
                label="Telegram bot token"
                fullWidth
                type="password"
                onChange={(e) => setToken(e.target.value)}
              />
              <Button onClick={sendToken} variant="outlined">
                Connect
              </Button>
            </Stack>
          </CardContent>
        )}
        <CardContent>{loading && <LinearProgress />}</CardContent>
      </Card>
    </Center>
  );
}
