import {
  Text,
  Center,
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  ButtonGroup,
  Textarea,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../common/Button";
import { routes } from "../../../app/config";
import { useApi } from "../../../app/hooks";
import { emptyProfile } from "../../../app/interfaces";
import { TelegramIcon } from "../../../ui/icons";

export const Profile = ({ isOpen, onClose }: ProfileProps): JSX.Element => {
  const { push } = useRouter();
  const { getProfile, updateProfile } = useApi();

  const [user, setUser] = useState(emptyProfile);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile().then((u) => setUser(u));
  }, []);

  const handleUpdate = useCallback(() => {
    setLoading(true);
    updateProfile(user)
      .then((u) => setUser(u))
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Stack>
              <InputGroup>
                <InputLeftAddon>Login</InputLeftAddon>
                <Input
                  value={user.login}
                  onChange={({ target }) => {
                    setUser({ ...user, login: target.value });
                  }}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Name</InputLeftAddon>
                <Input
                  value={user.name}
                  onChange={({ target }) => {
                    setUser({ ...user, name: target.value });
                  }}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>
                  <Icon as={TelegramIcon} mr="1" />
                  Token
                </InputLeftAddon>
                <Input
                  value={user.telegram_bot_token}
                  onChange={({ target }) => {
                    setUser({ ...user, telegram_bot_token: target.value });
                  }}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>
                  <Icon as={TelegramIcon} mr="1" />
                  Chat id
                </InputLeftAddon>
                <Input
                  value={user.telegram_bot_chat_id}
                  onChange={({ target }) => {
                    setUser({ ...user, telegram_bot_chat_id: target.value });
                  }}
                />
              </InputGroup>
              <Text mb="8px">Bio:</Text>
              <Textarea
                value={user.bio}
                onChange={({ target }) => {
                  setUser({ ...user, bio: target.value });
                }}
              />
              <ButtonGroup justifyContent="space-between">
                <Button
                  onClick={() => {
                    push(routes.root);
                  }}
                >
                  Back
                </Button>
                <Button
                  isLoading={loading}
                  loadingText="Updating"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </ButtonGroup>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}
