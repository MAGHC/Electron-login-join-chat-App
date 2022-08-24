import { auth } from "./firebase";
import React, { useState, createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: Boolean;
  currentUser: {};
}

let AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user.providerData[0]);
      setIsAuthenticated(true);
    } else {
      setCurrentUser({});
      setIsAuthenticated(false);
    }
  });

  return <AuthContext.Provider value={{ currentUser, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
