import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  ButtonGroup,
  Center,
  Stack,
  Box,
  Text,
  Icon,
  Tooltip,
} from "@chakra-ui/react";

import { TelegramIcon, ChatIcon } from "../../src/ui/icons";
import { useApi } from "../../src/app/hooks";
import { routes } from "../../src/app/config";
import { AppContext } from "../../src/app/context";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { error } = useContext(AppContext);
  const { status, registerBot, registerChat, getChat } = useApi();

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
        setUsername(`${data.username}`);
        setChat(data.id.toString());
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
        setChat(data.id.toString());
      })
      .catch(({ response }) => {
        const { data } = response;
        error(data.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Center h="80vh">
      <Box>
        {tokenConfirmed ? (
          <>
            {username && (
              <Box>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Icon as={ChatIcon} />
                  <Text>Are you {username}?</Text>
                  <ButtonGroup>
                    <Button onClick={confirmUsername} isLoading={loading}>
                      Yes, I am!
                    </Button>
                    <Button onClick={getLastChatId} isLoading={loading}>
                      No, go check again!
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Box>
            )}
            <Box>
              <Text>
                If not, please send a message to your bot to help as identify
                your chat id.
              </Text>
            </Box>
          </>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip label="We send invocation code to this bot">
              <InputGroup>
                <InputLeftAddon>
                  <Icon as={TelegramIcon} />
                </InputLeftAddon>
                <Input
                  value={token}
                  placeholder="Telegram bot token"
                  type="password"
                  onChange={(e) => setToken(e.target.value)}
                  disabled={loading}
                />
              </InputGroup>
            </Tooltip>
            <Button onClick={sendToken} variant="solid" isLoading={loading}>
              Connect
            </Button>
          </Stack>
        )}
      </Box>
    </Center>
  );
}
