import React from "react";
import { Table } from "../../../Components/Table";
const columns = [
  { key: "timeFrom", label: "Start" },
  { key: "timeTo", label: "End" },
  { key: "accepted", label: "Status" },
];

const UserHomePage = () => {
  return (
    <>
      <Table columns={columns || []} />
    </>
  );
};

export default UserHomePage;
