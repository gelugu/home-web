import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Menu } from "../components";
import { Dashboard } from "../components/Dashboard";

interface DesktopLayoutProps {
  children: ReactNode;
}

export function DesktopLayout({ children }: DesktopLayoutProps): JSX.Element {
  return (
    <Grid
      templateAreas={`"nav main tasks"`}
      gridTemplateColumns="2fr 5fr 3fr"
      h="100vh"
      p="1"
      gap="1"
    >
      <GridItem area="nav">
        <Menu />
      </GridItem>
      <GridItem area="main">
        <Dashboard />
      </GridItem>
      <GridItem area="tasks">{children}</GridItem>
    </Grid>
  );
}
