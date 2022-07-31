import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import { Container, LinearProgress } from "@mui/material";

import { LayoutProps } from "./Layout.props";

import { Header } from "../../components";

import styles from "./Layout.module.css";
import { routes } from "../../config";
import { AppContext } from "../../context/app";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const layoutStyle = cn(styles.layout);

  const { token } = useContext(AppContext);
  const { push } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token === "") {
      setLoading(true);
      push(routes.login);
    } else setLoading(false);
  }, []);

  const pages = [{ name: "Tasks", route: routes.tasks }];

  return (
    <div className={layoutStyle}>
      <Header logo="Home" pages={pages} />
      {loading ? (
        <LinearProgress />
      ) : (
        <Container sx={{ padding: 2 }}>{children}</Container>
      )}
    </div>
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
