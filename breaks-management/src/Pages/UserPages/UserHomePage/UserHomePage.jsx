import React, { useEffect, useState } from "react";
import { TimeCountDown } from "../../../Components/TimeCountDown";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Dialog } from "../../../Components/DialogComponent";

const UserHomePage = () => {
  const { loggedIn, signInHandler } = useAuthContext();
  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 absolute w-full">
        <TimeCountDown />
      </div>
    </div>
  );
};

export default UserHomePage;
