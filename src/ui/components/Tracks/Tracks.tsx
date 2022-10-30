import { useCallback, useContext, useState } from "react";
import {
  Progress,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  InputGroup,
  InputLeftAddon,
  Input,
  useDisclosure,
  Text,
  Textarea,
  ButtonGroup,
} from "@chakra-ui/react";

import { Tasks } from "../../components";

import { useApi } from "../../../app/hooks";
import { emptyTrack } from "../../../app/interfaces";
import { CreateProjectIcon, ProjectIcon } from "../../icons";
import { AppContext, TracksContext } from "../../../app/context";

export function Tracks(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createTrack } = useApi();
  const { success } = useContext(AppContext);
  const { tracks, currentTrack, setCurrentTrack, fetchTasks } =
    useContext(TracksContext);

  const [loading, setLoading] = useState(false);

  const [newTrackName, setNewTrackName] = useState("");
  const [newTrackDescription, setNewTrackDescription] = useState("");

  const createTrackHandler = useCallback(() => {
    setLoading(true);

    createTrack({
      name: newTrackName,
      description: newTrackDescription,
    })
      .then((track) => {
        success("New track created", `Switched to "${track.name}" track`);
        setCurrentTrack(track);
        fetchTasks();
        onClose();
      })
      .finally(() => setLoading(false));
  }, [newTrackName, newTrackDescription]);

  return (
    <Stack p="1">
      <Menu>
        <MenuButton as={Button} rightIcon={<ProjectIcon />}>
          {currentTrack === emptyTrack ? (
            <Progress isIndeterminate />
          ) : (
            currentTrack.name
          )}
        </MenuButton>
        <MenuList>
          {tracks.map((track) => (
            <MenuItem key={track.id} onClick={() => setCurrentTrack(track)}>
              {track.name}
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem onClick={onOpen} icon={<CreateProjectIcon />}>
            Create new
          </MenuItem>
        </MenuList>
      </Menu>
      <Tasks trackId={currentTrack.id} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Stack>
                <InputGroup>
                  <InputLeftAddon>Name</InputLeftAddon>
                  <Input
                    value={newTrackName}
                    onChange={({ target }) => {
                      setNewTrackName(target.value);
                    }}
                  />
                </InputGroup>
                <Text mb="8px">Description:</Text>
                <Textarea
                  value={newTrackDescription}
                  onChange={({ target }) => {
                    setNewTrackDescription(target.value);
                  }}
                />
                <ButtonGroup justifyContent="space-between">
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    isLoading={loading}
                    loadingText="Updating"
                    onClick={createTrackHandler}
                  >
                    Create
                  </Button>
                </ButtonGroup>
              </Stack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
