import { createContext, PropsWithChildren, useState } from "react";
import { SnackbarProvider } from "notistack";

export interface IAppContext {
  token?: string;
  setToken?: (token: string | undefined) => void;
}

export const AppContext = createContext<IAppContext>({
  token: undefined,
});

export const AppContextProvider = (
  props: PropsWithChildren<IAppContext>
): JSX.Element => {
  const [token, setToken] = useState<string | undefined>(props.token);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      <SnackbarProvider maxSnack={5}>{props.children}</SnackbarProvider>
    </AppContext.Provider>
  );
};
