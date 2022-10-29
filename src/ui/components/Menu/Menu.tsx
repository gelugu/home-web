import {
  Button,
  ButtonGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useApi } from "../../../app/hooks";
import { LogoutIcon, ProfileIcon } from "../../icons";
import { Profile } from "../Profile";

export const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useApi();

  return (
    <Stack h="100%" justifyContent="flex-end">
      <ButtonGroup>
        <Button onClick={onOpen} leftIcon={<ProfileIcon />}>
          Profile
        </Button>
      </ButtonGroup>
      <Profile isOpen={isOpen} onClose={onClose} />

      <ButtonGroup>
        <Button onClick={logout} leftIcon={<LogoutIcon />}>
          Logout
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
