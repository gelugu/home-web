import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Center,
  HStack,
  PinInput,
  PinInputField,
  Tooltip,
} from "@chakra-ui/react";

import { useApi } from "../../src/app/hooks";
import { routes } from "../../src/app/config";
import { AppContext } from "../../src/app/context";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { setToken, error } = useContext(AppContext);
  const { status, sendCode, login } = useApi();

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
        .then((data) => {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          push(routes.root);
        })
        .catch(({ response }) => {
          error(response.data);
        });
  }, [code]);

  return (
    <Center h="80vh">
      <Box>
        <HStack>
          <Tooltip label="Invitation code, check telegram bot">
            <PinInput value={code} onChange={(e) => setCode(e)} autoFocus>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </Tooltip>
        </HStack>
      </Box>
    </Center>
  );
}
