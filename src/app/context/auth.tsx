import { createContext, PropsWithChildren, useEffect } from "react";

export interface IAuthContext {
  token: string;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<IAuthContext>({
  token: "",
  setToken: () => ({}),
});

export const AuthContextProvider = ({
  children,
  token,
  setToken,
}: PropsWithChildren<IAuthContext>): JSX.Element => {
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
