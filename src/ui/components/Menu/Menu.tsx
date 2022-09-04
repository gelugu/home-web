import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "../../../app/config";
import { useApi } from "../../../app/hooks";

export const Menu = () => {
  const { push } = useRouter();
  const { logout } = useApi();

  return (
    <Stack h="100%">
      <ButtonGroup flex="1">
        <Button
          flex="1"
          onClick={() => {
            push(routes.profile);
          }}
        >
          Profile
        </Button>
      </ButtonGroup>
      <ButtonGroup justifySelf="flex-end">
        <Button flex="1" onClick={logout}>
          Logout
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
