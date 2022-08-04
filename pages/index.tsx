import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Tasks from "../components/Tasks/Tasks";
import { routes } from "../config";

function Home(): JSX.Element {
  const { push } = useRouter();
  useEffect(() => {
    push(routes.root);
  });
  return (
    <Container>
      <Tasks />
    </Container>
  );
}

export default Home;
