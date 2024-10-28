import React, { createContext, ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any | null;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogin: (token: string) => {},
  handleLogout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<any>(token);

      // Optionally, check if the token is expired here
      if (decodedToken) {
        setUser(decodedToken);
      }
    }
  }, []);

  const handleLogin = (token: string) => {
    const decodedToken = jwtDecode<any>(token);
    if (decodedToken) {
      localStorage.setItem("userId", decodedToken.sub);
      localStorage.setItem("userRoles", decodedToken.roles);
      localStorage.setItem("token", token);
      setUser(decodedToken);
    } else {
      console.error("Decoded token is null");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
