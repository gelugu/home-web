import { Grid, GridItem } from "@chakra-ui/react";
import { Tasks } from "../src/ui/components";

function Home(): JSX.Element {
  return (
    <Grid
      templateAreas={`"nav main tasks"`}
      gridTemplateColumns="2fr 5fr 3fr"
      h="100vh"
      p="1"
      gap="1"
    >
      <GridItem area="nav">Nav</GridItem>
      <GridItem area="main">Main</GridItem>
      <GridItem area="tasks">
        <Tasks />
      </GridItem>
    </Grid>
  );
}

export default Home;
