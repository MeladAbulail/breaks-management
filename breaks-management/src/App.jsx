import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import appRoutes from "./Pages/appRoutes";
import Navbar from "./Components/Navbar/Navbar";
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <div className="min-h-screen bg-[#FFF] flex flex-col">
      <AuthProvider>
        <Router>
          <Navbar />
          <div className="flex-1 mt-20">
            <Routes>
              {appRoutes().map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
