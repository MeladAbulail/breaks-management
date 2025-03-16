import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import FerasProfile from "../../assets/FerasProfile.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Dialog } from "../DialogComponent";
import RequestBreakDialogRow from "./RequestBreakDialogRow";

function Navbar() {
  const navigate = useNavigate();
  const { loggedIn, isAdmin, signOutHandler } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpenRequestsDialog, setIsOpenRequestsDialog] = useState(false);
  const [breakRequests, setBreakRequests] = useState([]);

  function openRequestsDialog() {
    setIsOpenRequestsDialog(true);
  }

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("breakRequests")).filter(
      (item) => item.accepted === null
    );
    console.log("values", values);

    setBreakRequests(values);
  }, []);

  return (
    <>
      <Dialog
        isOpen={isOpenRequestsDialog}
        onClose={() => setIsOpenRequestsDialog(false)}
        dialogTitle="Pending Requests"
        withoutSubmitButton={true}
        dialogContent={
          <div className="space-y-4">
            {breakRequests?.map((request, index) => (
              <>
                <div index={index}>
                  <RequestBreakDialogRow request={request} />
                </div>
              </>
            ))}
          </div>
        }
      />

      <nav className="bg-white text-black shadow-md p-4 border-b border-gray-300 fixed  w-full  z-[100]">
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
              <div className="relative flex flex-row">
                {isAdmin ? (
                  <div>
                    <button
                      className="bg-[#f98232] text-white px-4 py-2 rounded-md  transition mr-[32px] cursor-pointer"
                      onClick={(e) => {
                        openRequestsDialog();
                      }}
                    >
                      <div className="relative">
                        <div className="w-[15px] h-[15px] bg-green-600 animate-pulse rounded-full absolute -right-5 -top-3"></div>
                      </div>
                      Requests
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <img
                  src={FerasProfile}
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
                className="bg-[#f98232] text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
