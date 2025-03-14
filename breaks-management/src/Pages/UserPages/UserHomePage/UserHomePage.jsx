import React, { useEffect, useState } from "react";
import { TimeCountDown } from "../../../Components/TimeCountDown";

const UserHomePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 absolute w-full">
        <TimeCountDown />
      </div>
    </div>
  );
};

export default UserHomePage;
