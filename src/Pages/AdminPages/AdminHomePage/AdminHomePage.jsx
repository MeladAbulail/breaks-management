import React, { useEffect, useState } from "react";
import Timeline from "../../../Components/Timeline/Timeline";
import "./styles.css";
import { Dialog } from "../../../Components/DialogComponent";

const AdminHomePage = () => {
  const [acceptedBreaks, setAcceptedBreaks] = useState([]);

  useEffect(() => {
    const values =
      JSON.parse(localStorage.getItem("breakRequests"))?.filter(
        (item) => item.accepted === true
      ) || [];

    setAcceptedBreaks(values);
  }, []);

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
