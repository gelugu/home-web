import {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { Center, CircularProgress, useMediaQuery } from "@chakra-ui/react";

import { useApi } from "../../app/hooks";
import { AppContext } from "../../app/context";
import { mobileScreen, routes } from "../../app/config";
import { MobileLayout } from ".";
import { DesktopLayout } from ".";

const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  const [isMobile] = useMediaQuery(mobileScreen);
  const { status } = useApi();
  const { error, setToken, token } = useContext(AppContext);
  const { push, asPath } = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => setToken(localStorage.getItem("token")));

  useEffect(() => {
    if (token === "") return;
    status()
      .then(() => setLoading(false))
      .catch(({ response }) => {
        error("Token invalid", response.data);
        if (response.status === 401 && asPath !== routes.signup) {
          push(routes.signin);
        }
      });
  }, [token]);

  if (loading) {
    return (
      <Center h="100vh">
        {isMobile ? (
          <MobileLayout children={<CircularProgress isIndeterminate />} />
        ) : (
          <DesktopLayout children={<CircularProgress isIndeterminate />} />
        )}
      </Center>
    );
  } else {
    return <>{children}</>;
  }
};

interface AuthLayoutProps {
  children: ReactNode;
}

export const withAuth = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return (props: T): JSX.Element => (
    <AuthLayout>
      <Component {...props}></Component>
    </AuthLayout>
  );
};
