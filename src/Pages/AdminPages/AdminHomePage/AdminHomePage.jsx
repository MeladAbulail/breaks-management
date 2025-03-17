import React, { useEffect, useState } from "react";
import Timeline from "../../../Components/Timeline/Timeline";
import "./styles.css";
import { useAuthContext } from "../../../contexts/AuthContext";

const AdminHomePage = () => {
  const { breakRequests, acceptedBreaks, setAcceptedBreaks } = useAuthContext();

  useEffect(() => {
    const values =
      JSON.parse(localStorage.getItem("breakRequests"))?.filter(
        (item) => item.accepted === true
      ) || [];

    setAcceptedBreaks(values);
  }, [breakRequests]);

  return (
    <>
      <div>
        <div>
          <Timeline acceptedBreaks={acceptedBreaks} />
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
