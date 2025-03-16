import { createContext, useContext, useEffect, useState } from "react";
import useGetIsAdmin from "../Hooks/useGetIsAdmin";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  loggedIn: false,
  isAdmin: false,
  signInHandler: () => {},
  signOutHandler: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("🚀 ~ AuthProvider ~ loggedIn:", loggedIn)
  const [isAdmin, setIsAdmin] = useState(useGetIsAdmin());
  const navigate = useNavigate();

  const signInHandler = (data, isAdmin) => {
    localStorage.setItem("token", JSON.stringify({ user: data.user }));
    localStorage.setItem("isAdmin", JSON.stringify({ isAdmin: isAdmin }));
    setLoggedIn(true);
    setIsAdmin(isAdmin || false);
  };

  const signOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setLoggedIn(false);
    navigate("/sign-in");
  };

  function checkForSessionInfo() {
    const isLoggedIn = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    console.log("pewpew");
    

    if (isLoggedIn) {
      setLoggedIn(true);
    }

    if (isAdmin === true) {
      setIsAdmin(true);
    }

    if (!isLoggedIn) {
      navigate("/sign-in");
    }
  }

  useEffect(() => {
    checkForSessionInfo();
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{ loggedIn, isAdmin, signInHandler, signOutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
