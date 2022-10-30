import {
  ButtonGroup,
  Collapse,
  Grid,
  GridItem,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { useApi } from "../../app/hooks";
import { Dashboard } from "../components/Dashboard";
import { Profile } from "../components/Profile";
import { LogoutIcon, ProfileIcon, TaskIcon } from "../icons";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openTasks, setOpenTasks] = useState(true);
  const { logout } = useApi();

  return (
    <Grid
      h={`${document.documentElement.clientHeight}px`}
      gap="1"
      p="1"
      templateAreas={`"dashboard"
                      "tasks"
                      "nav"`}
      gridTemplateRows="auto 1fr auto"
      alignItems="flex-end"
    >
      <GridItem area="dashboard">
      <Dashboard />
      </GridItem>
      <GridItem area="nav">
        <HStack>
          <ButtonGroup flex="1" justifyContent="space-around">
            <IconButton
              onClick={onOpen}
              aria-label="Profile"
              icon={<ProfileIcon />}
            />
          </ButtonGroup>
          <Profile isOpen={isOpen} onClose={onClose} />
          <ButtonGroup flex="1" justifyContent="space-around">
            <IconButton
              onClick={() => setOpenTasks(!openTasks)}
              aria-label={openTasks ? "Close tasks" : "Open tasks"}
              icon={<TaskIcon />}
            />
          </ButtonGroup>
          <ButtonGroup flex="1" justifyContent="space-around">
            <IconButton
              onClick={logout}
              aria-label="Log out"
              icon={<LogoutIcon />}
            />
          </ButtonGroup>
        </HStack>
      </GridItem>
      <Collapse in={openTasks}>
        <GridItem area="tasks">{children}</GridItem>
      </Collapse>
    </Grid>
  );
}
