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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { routes } from "../../src/app/config";
import { useApi } from "../../src/app/hooks";
import { emptyProfile } from "../../src/app/interfaces";
import { Button } from "../../src/ui/components/common/Button";
import { TelegramIcon } from "../../src/ui/icons";
import { withAuth } from "../../src/ui/layouts";

const Profile = (): JSX.Element => {
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
    <Center h="80vh">
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
            Chat id</InputLeftAddon>
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
  );
};

export default withAuth(Profile);
