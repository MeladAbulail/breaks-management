import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import appRoutes from "./Pages/appRoutes";
import Navbar from "./Components/Navbar/Navbar";
import { useAuthContext } from "./contexts/AuthContext";

const breakRequests = [
  {
    id: 1,
    userName: "Melad Abulail",
    timeFrom: "8:00 AM",
    timeTo: "8:10 AM",
    accepted: true,
  },
  {
    id: 2,
    userName: "Feras Khawaja",
    timeFrom: "9:30 AM",
    timeTo: "9:40 AM",
    accepted: true,
  },
  {
    id: 3,
    userName: "Mohammad Alhaj",
    timeFrom: "10:30 AM",
    timeTo: "10:40 AM",
    accepted: null,
  },
  {
    id: 4,
    userName: "Andrew Smith",
    timeFrom: "11:30 AM",
    timeTo: "11:40 AM",
    accepted: null,
  },
  {
    id: 5,
    userName: "Mohammad Ali",
    timeFrom: "2:30 PM",
    timeTo: "2:40 AM",
    accepted: false,
  },
];

const App = () => {
  const { loggedIn, isAdmin } = useAuthContext();
  useEffect(() => {
    if (!localStorage.getItem("breakRequests")) {
      localStorage.setItem("breakRequests", JSON.stringify(breakRequests));
    }
  }, []);

  const routes = appRoutes(loggedIn, isAdmin);

  return (
    <div className="min-h-screen bg-[#FFF] flex flex-col">
      <Navbar />
      <div className="flex-1 mt-20">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default App;
