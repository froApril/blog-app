import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  currentUser: string;
  login: (input: Input) => void;
  logout: () => void;
} | null>(null);

interface Props {
  children: React.ReactNode;
}

interface Input {
  username: string;
  password: string;
}

export const AuthContexProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const login = (input: Input) => {
    console.log("Try login with: " + input);
    setCurrentUser(input.username);
    return;
  };

  const logout = () => {
    console.log("Try logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
