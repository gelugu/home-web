import {
  Button,
  ButtonGroup,
  Collapse,
  Grid,
  GridItem,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { routes } from "../../app/config";
import { useApi } from "../../app/hooks";
import { LogoutIcon, ProfileIcon, TaskIcon } from "../icons";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps): JSX.Element {
  const [openTasks, setOpenTasks] = useState(true);
  const { push } = useRouter();
  const { logout } = useApi();

  return (
    <Grid
      h={`${document.documentElement.clientHeight}px`}
      gap="1"
      p="1"
      templateAreas={`"tasks"
                      "nav"`}
      gridTemplateRows="1fr auto"
      alignItems="flex-end"
    >
      <GridItem area="nav">
        <HStack>
          <ButtonGroup flex="1" justifyContent="space-around">
            <Button onClick={() => push(routes.profile)}>
              <Icon as={ProfileIcon} />
            </Button>
          </ButtonGroup>
          <ButtonGroup flex="1" justifyContent="space-around">
            <Button onClick={() => setOpenTasks(!openTasks)}>
              <Icon as={TaskIcon} />
            </Button>
          </ButtonGroup>
          <ButtonGroup flex="1" justifyContent="space-around">
            <Button onClick={logout}>
              <Icon as={LogoutIcon} />
            </Button>
          </ButtonGroup>
        </HStack>
      </GridItem>
      <Collapse in={openTasks}>
        <GridItem area="tasks">{children}</GridItem>
      </Collapse>
    </Grid>
  );
}
