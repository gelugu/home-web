import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Link } from "../components";
import { routes } from "../config";
import { withLayout } from "../layouts";

function Home(): JSX.Element {
  const { push } = useRouter();
  useEffect(() => {
    push(routes.root);
  });
  return (
    <Container>
      <p>Dashboard in progress...</p>
    </Container>
  );
}

export default withLayout(Home);
