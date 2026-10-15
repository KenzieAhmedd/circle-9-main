import { createContext, useEffect, useState, type ReactElement } from "react";
import { authServices } from "../services/authService";
import type { UserI } from "../interfaces/userI";

export const authContext = createContext<any>({});

export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserI | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  async function getUserData() {
    try {
      const response = await authServices.getUserData();
      // VERIFY: console.log(response) once to confirm the user is at response.data.user
      setUserData(response.data.user);
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoading, userData, setUserData }}
    >
      {children}
    </authContext.Provider>
  );
}
