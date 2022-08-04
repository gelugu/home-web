import { Container } from "@chakra-ui/react";
import { Tasks } from "../src/ui/components";

function Home(): JSX.Element {
  return (
    <Container>
      <Tasks />
    </Container>
  );
}

export default Home;
