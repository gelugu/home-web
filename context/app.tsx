import { createContext, PropsWithChildren, useCallback } from "react";
import { SnackbarKey, useSnackbar } from "notistack";

export interface IAppContext {
  token: string;
  setToken: (token: string) => void;
  error: (message: string) => SnackbarKey;
}

export const AppContext = createContext<IAppContext>({
  token: "",
  setToken: () => {},
  error: () => "",
});

export const AppContextProvider = ({
  children,
  token,
  setToken,
}: PropsWithChildren<IAppContext>): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  const error = useCallback(
    (message: string) => enqueueSnackbar(message, { variant: "error" }),
    []
  );

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
