import { LoginPage } from "./LoginPage";
import useGetIsAdmin from "../Hooks/useGetIsAdmin";
import useGetSessionInfo from "../Hooks/useGetSessionInfo";
import { Navigate } from "react-router-dom";
import { AdminHomePage } from "./AdminPages/AdminHomePage";
import { UserHomePage } from "./UserPages/UserHomePage";

const appRoutes = () => {
  const isAdmin = useGetIsAdmin();
  const isSignedIn = useGetSessionInfo();

  const getHomePage = () => {
    // if (!isSignedIn) return <Navigate to="/sign-in" replace />;
    return isAdmin ? <AdminHomePage /> : <UserHomePage />;
  };

  return [
    { path: "/home", element: getHomePage() },
    {
      path: "/sign-in",
      element: isSignedIn ? <Navigate to="/home" replace /> : <LoginPage />,
    },
  ];
};

export default appRoutes;
