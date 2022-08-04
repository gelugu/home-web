import { createContext, PropsWithChildren, useCallback } from "react";
import { ToastId, useToast } from "@chakra-ui/react";

export interface IAppContext {
  token: string;
  setToken: (token: string) => void;
  error: (title: string, description?: string) => ToastId;
  success: (title: string, description?: string) => ToastId;
}

export const AppContext = createContext<IAppContext>({
  token: "",
  setToken: () => {},
  error: () => "",
  success: () => "",
});

export const AppContextProvider = ({
  children,
  token,
  setToken,
}: PropsWithChildren<IAppContext>): JSX.Element => {
  const toast = useToast();

  const defaultToastTime = 5000

  const error = useCallback(
    (title: string, description: string = "") =>
      toast({
        title,
        description,
        status: "error",
        duration: defaultToastTime,
        isClosable: true,
      }),
    []
  );

  const success = useCallback(
    (title: string, description: string = "") =>
      toast({
        title,
        description,
        status: "success",
        duration: defaultToastTime,
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
