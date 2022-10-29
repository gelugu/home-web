import { useCallback, useContext, useEffect, useState } from "react";
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
import { emptyTrack, Track } from "../../../app/interfaces";
import { CreateProjectIcon, ProjectIcon } from "../../icons";
import { AppContext } from "../../../app/context";

export function Tracks(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getTracks, createTrack } = useApi();
  const { success } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState(emptyTrack);
  const [newTrackName, setNewTrackName] = useState("");
  const [newTrackDescription, setNewTrackDescription] = useState("");

  const fetchTasks = useCallback(async () => {
    getTracks().then((data) => {
      setTracks(data);

      const localTrack = localStorage.getItem("currentTrack");
      if (
        data.length > 0 &&
        localTrack &&
        data.map((t) => t.id).includes(localTrack)
      ) {
        setCurrentTrackHandler(data.filter((t) => t.id === localTrack)[0]);
      } else setCurrentTrackHandler(data[0]);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchTasks().finally(() => setLoading(false));
  }, []);

  const setCurrentTrackHandler = useCallback((track: Track) => {
    setCurrentTrack(track);
    localStorage.setItem("currentTrack", track.id);
  }, []);

  const createTrackHandler = useCallback(() => {
    createTrack({
      name: newTrackName,
      description: newTrackDescription,
    }).then((track) => {
      success("New track created", `Switched to "${track.name}" track`);
      setCurrentTrackHandler(track);
    });
  }, [newTrackName, newTrackDescription]);

  return (
    <Stack p="1">
      <Menu>
        <MenuButton as={Button} rightIcon={<ProjectIcon />}>
          {loading ? <Progress isIndeterminate /> : currentTrack.name}
        </MenuButton>
        <MenuList>
          {tracks.map((track) => (
            <MenuItem
              key={track.id}
              onClick={() => setCurrentTrackHandler(track)}
            >
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
