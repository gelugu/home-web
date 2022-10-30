import { createContext, PropsWithChildren, useCallback } from "react";
import { ToastId, useMediaQuery, useToast } from "@chakra-ui/react";
import { mobileScreen } from "../config";

export interface IAppContext {
  error: (title: string, description?: string, duration?: number) => ToastId;
  success: (title: string, description?: string, duration?: number) => ToastId;
}

export const AppContext = createContext<IAppContext>({
  error: () => null,
  success: () => null,
});

export const AppContextProvider = ({
  children,
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
        position: isMobile ? "top-left" : "bottom-left",
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
        error,
        success,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
