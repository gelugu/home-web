import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { routes } from "../../../app/config";

export const Menu = () => {
  const { push } = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    push(routes.login);
  }, []);
  return (
    <Stack h="100%" flexDirection="row">
      <Button
        flex="1"
        alignSelf="flex-end"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};
