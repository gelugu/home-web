import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import { Container, Progress } from "@chakra-ui/react";

import { routes } from "../../../app/config";
import { AppContext } from "../../../app/context";

const Layout = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const { token } = useContext(AppContext);
  const { push } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token === "") {
      setLoading(true);
      push(routes.login);
    } else {
      setLoading(false);
    }
  }, []);

  const pages = [{ name: "Tasks", route: routes.tasks }];

  return (
    <div>{loading ? <Progress /> : <Container>{children}</Container>}</div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return (props: T): JSX.Element => (
    <Layout>
      <Component {...props}></Component>
    </Layout>
  );
};
