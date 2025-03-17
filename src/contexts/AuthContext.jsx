import { createContext, useContext, useEffect, useState } from "react";
import useGetIsAdmin from "../Hooks/useGetIsAdmin";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  loggedIn: false,
  isAdmin: false,
  breakRequests: [],
  acceptedBreaks: [],
  setBreakRequests: () => {},
  setAcceptedBreaks: () => {},
  signInHandler: () => {},
  signOutHandler: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(useGetIsAdmin());
  const [breakRequests, setBreakRequests] = useState(false);
  const [acceptedBreaks, setAcceptedBreaks] = useState([]);
  const navigate = useNavigate();

  const signInHandler = (data, isAdmin) => {
    const session = {
      userName: data.user.split("@")[0],
      breakRemainingTime: 25,
      userBreaks: [
        {
          id: 5236960791,
          userName: "Feras Khawaja",
          timeFrom: "08:00 AM",
          timeTo: "08:05 AM",
          accepted: true,
        },
        {
          id: 5236960792,
          userName: "Feras Khawaja",
          timeFrom: "08:00 AM",
          timeTo: "08:05 AM",
          accepted: false,
        },
      ],
    };
    localStorage.setItem("token", JSON.stringify({ user: data.user }));
    localStorage.setItem("isAdmin", JSON.stringify({ isAdmin: isAdmin }));
    localStorage.setItem("session", JSON.stringify(session));
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
      value={{
        loggedIn,
        isAdmin,
        breakRequests,
        setBreakRequests,
        signInHandler,
        signOutHandler,
        acceptedBreaks,
        setAcceptedBreaks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
