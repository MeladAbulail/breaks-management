import React, { useState } from "react";
import useGetSessionInfo from "../../Hooks/useGetSessionInfo";
import Logo from "../../assets/Logo.png";
import FerasProfile from "../../assets/FerasProfile.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { loggedIn, signOutHandler } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = {
    name: "John Doe",
    avatar: FerasProfile,
  };

  return (
    <nav className="bg-white text-black shadow-md p-4 border-b border-gray-300 fixed  w-full z-100 bg-white"> 
      <div className="flex justify-between items-center px-5">
        <div className="">
          <img
            src={Logo}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => {}}
          />
        </div>

        <div>
          {loggedIn ? (
            <div className="relative">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
                  <button
                    onClick={(e) => {
                      setDropdownOpen(false);
                      signOutHandler();
                      navigate("/sign-in");
                    }}
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/sign-in")}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
