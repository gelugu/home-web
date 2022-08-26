import {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  PinInput,
  PinInputField,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";

import { useApi } from "../../src/app/hooks";
import { mobileScreen, routes } from "../../src/app/config";
import { AppContext } from "../../src/app/context";

export default function SignUp(): JSX.Element {
  const [isMobile] = useMediaQuery(mobileScreen);
  const { push } = useRouter();
  const { setToken, error } = useContext(AppContext);
  const { sendCode, loginWithCode, loginWithPassword } = useApi();

  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState("");
  const [isCodeSended, setIsCodeSended] = useState(false);

  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    setLogin(localStorage.getItem("login") || "");
  }, []);

  useEffect(() => {
    if (code.length === 4) loginWithCodeHandler();
  }, [code]);

  const loginWithCodeHandler = useCallback(() => {
    localStorage.setItem("login", login);
    setLoading(true);

    loginWithCode({ code, login })
      .then((data) => {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        push(routes.root);
      })
      .catch(({ response }) => {
        error("Login failed", response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const loginWithPasswordHandler = useCallback(() => {
    localStorage.setItem("login", login);
    setLoading(true);

    loginWithPassword({ login, password })
      .then((data) => {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        push(routes.root);
      })
      .catch(({ response }) => {
        error("Login failed", response.data);
      })
      .finally(() => setLoading(false));
  }, [login, password]);

  const onTelegramTabHandler = useCallback(() => {
    if (isCodeSended) return;
    else sendCodeHandler();
  }, [isCodeSended]);

  const sendCodeHandler = useCallback(() => {
    sendCode().catch(({ response }) => {
      error("Can't send code", response.data);
    });

    setIsCodeSended(true);
  }, [isCodeSended]);

  const mobileCss: CSSProperties = {
    height: "80vh",
    alignItems: "flex-end",
  };

  const desktopCss: CSSProperties = {
    height: "80vh",
  };

  return (
    <Center style={isMobile ? mobileCss : desktopCss}>
      <Stack>
        <Tabs>
          <TabList justifyContent="space-around">
            <Tab>Password</Tab>
            <Tab onClick={onTelegramTabHandler}>Telegram</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack>
                <InputGroup>
                  <InputLeftAddon>Login</InputLeftAddon>
                  <Input
                    value={login}
                    onChange={({ target }) => {
                      setLogin(target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon>Password</InputLeftAddon>
                  <Input
                    type="password"
                    value={password}
                    onChange={({ target }) => {
                      setPassword(target.value);
                    }}
                    isDisabled={loading}
                  />
                </InputGroup>
                <ButtonGroup justifyContent="space-between">
                  <Button onClick={() => push(routes.registration)}>
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => {
                      loginWithPasswordHandler();
                    }}
                    isDisabled={login === "" || password === ""}
                    isLoading={loading}
                  >
                    Sign In
                  </Button>
                </ButtonGroup>
              </Stack>
            </TabPanel>

            <TabPanel>
              <Box>
                <Stack>
                  <InputGroup>
                    <InputLeftAddon>Login</InputLeftAddon>
                    <Input
                      value={login}
                      onChange={({ target }) => {
                        setLogin(target.value);
                      }}
                    />
                  </InputGroup>
                  <HStack>
                    <Tooltip label="Invitation code, check telegram bot">
                      <PinInput
                        value={code}
                        onChange={(e) => setCode(e)}
                        autoFocus
                        isDisabled={loading}
                      >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </Tooltip>
                    <Button onClick={sendCodeHandler}>Send code</Button>
                  </HStack>
                  <ButtonGroup justifyContent="flex-start">
                    <Button onClick={() => push(routes.registration)}>
                      Sign Up
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Center>
  );
}
