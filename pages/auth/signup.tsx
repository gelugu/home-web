import { CSSProperties, useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Button,
  ButtonGroup,
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";

import { useApi } from "../../src/app/hooks";
import { mobileScreen, routes } from "../../src/app/config";
import { AppContext } from "../../src/app/context";

export default function SignUp(): JSX.Element {
  const [isMobile] = useMediaQuery(mobileScreen);
  const { push } = useRouter();
  const { signUp } = useApi();
  const { error, success } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = useCallback(() => {
    setLoading(true);

    signUp({ login, name, password })
      .then((user) => {
        let userName = user.name;
        if (userName == "") userName = user.login;
        success(`Welcome, ${userName}`, "Now you can login");
        push(routes.signin);
      })
      .catch(({ response }) => {
        error("Sign Up failed", response.data);
        setPassword("");
      })
      .finally(() => setLoading(false));
  }, [loading, login, name, password]);

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
        <InputGroup>
          <InputLeftAddon>Name</InputLeftAddon>
          <Input
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </InputGroup>
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
          />
        </InputGroup>
        <ButtonGroup justifyContent="space-between">
          <Button onClick={() => push(routes.signin)}>Sign In</Button>
          <Button
            onClick={() => {
              handleSignUp();
            }}
            isDisabled={login === "" || password === ""}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </Stack>
    </Center>
  );
}
