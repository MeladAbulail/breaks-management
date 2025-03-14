import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  loggedIn: false,
  signInHandler: () => {},
  signOutHandler: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("🚀 ~ AuthProvider ~ loggedIn:", loggedIn)

  
  const signInHandler = (data, isAdmin) => {
    localStorage.setItem("token", JSON.stringify({ user: data.user }));
    if (isAdmin)
      localStorage.setItem("isAdmin", JSON.stringify({ isAdmin: true }));
    setLoggedIn(true);
  };

  const signOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, signInHandler, signOutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
