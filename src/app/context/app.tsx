import { createContext, PropsWithChildren, useCallback } from "react";
import { ToastId, useMediaQuery, useToast } from "@chakra-ui/react";
import { mobileScreen } from "../config";

export interface IAppContext {
  token: string;
  setToken: (token: string) => void;
  error: (title: string, description?: string) => ToastId;
  success: (title: string, description?: string) => ToastId;
}

export const AppContext = createContext<IAppContext>({
  token: "",
  setToken: () => ({}),
  error: () => "",
  success: () => "",
});

export const AppContextProvider = ({
  children,
  token,
  setToken,
}: PropsWithChildren<IAppContext>): JSX.Element => {
  const toast = useToast();
  const [isMobile] = useMediaQuery(mobileScreen);

  const error = useCallback(
    (title: string, description = "", duration = 5000) =>
      toast({
        title,
        description,
        status: "error",
        duration,
        isClosable: true,
        position: isMobile ? "top-left" : "bottom-left"
      }),
    []
  );

  const success = useCallback(
    (title: string, description = "", duration = 5000) =>
      toast({
        title,
        description,
        status: "success",
        duration,
        isClosable: true,
      }),
    []
  );

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        error,
        success,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
