import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps): JSX.Element {
  return (
    <Grid h="100vh" p="1" gap="1" alignItems="flex-end">
      <GridItem area="tasks">{children}</GridItem>
    </Grid>
  );
}
