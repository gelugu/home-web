import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Divider,
  Grid,
  GridItem,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { TaskIcon } from "../icons";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps): JSX.Element {
  const [openTasks, setOpenTasks] = useState(true);
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
        <Stack>
          <Divider />
          <ButtonGroup flex="1" justifyContent="space-around">
            <Button onClick={() => setOpenTasks(!openTasks)}>
              <Icon as={TaskIcon} />
            </Button>
          </ButtonGroup>
        </Stack>
      </GridItem>
      <Collapse in={openTasks}>
        <GridItem area="tasks">{children}</GridItem>
      </Collapse>
    </Grid>
  );
}
