import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const val = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
