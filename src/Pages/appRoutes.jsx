import { LoginPage } from "./LoginPage";
import { AdminHomePage } from "./AdminPages/AdminHomePage";
import { UserHomePage } from "./UserPages/UserHomePage";
import { useAuthContext } from "../contexts/AuthContext";

const appRoutes = (loggedIn, isAdmin) => {

  const getHomePage = () => {
    return loggedIn && isAdmin ? <AdminHomePage /> : <UserHomePage />;
  };

  return [
    { path: "/home", element: getHomePage() },
    {
      path: "/sign-in",
      element: <LoginPage />,
    },
  ];
};

export default appRoutes;
