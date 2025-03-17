import React, { useEffect, useState } from "react";
import { Dialog } from "../DialogComponent";
import { SelectComponent } from "../SelectComponent";
import { TimePicker } from "../TimePicker";
import { useAuthContext } from "../../contexts/AuthContext";

const options = [
  { id: 1, label: "Break" },
  { id: 2, label: "Emergency Break" },
];

function Table({ columns, rowsPerPage = 5 }) {
  const { breakRequests: breaks, setBreakRequests: setBreaks } =
    useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [exceedTheLimit, setExceedTheLimit] = useState(false);
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("session")) || []
  );
  const [breakRequests, setBreakRequests] = useState(
    JSON.parse(localStorage.getItem("breakRequests")) || []
  );
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("session")).userBreaks || []
  );
  const [newBreakRequest, setNewBreakRequest] = useState({
    timeFrom: "8:00 AM",
    timeTo: "8:10 AM",
    reason: "Break",
  });

  const [paginatedData, setPaginatedData] = useState(
    Array.isArray(data)
      ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      : []
  );

  const totalPages = Array.isArray(data)
    ? Math.ceil(data.length / rowsPerPage)
    : 0;

  const handleSelectChange = (value) => {
    setNewBreakRequest({ ...newBreakRequest, reason: value });
  };

  const handleTimeChange = (newTime, key) => {
    setNewBreakRequest((prev) => {
      const updatedRequest = { ...prev, [key]: newTime };

      const timeFromMinutes = parseTime(updatedRequest.timeFrom);
      const timeToMinutes = parseTime(updatedRequest.timeTo);
      const breakDuration = timeToMinutes - timeFromMinutes;

      setExceedTheLimit(breakDuration > session.breakRemainingTime);
      return updatedRequest;
    });
  };

  const generateRandomId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  };
  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const handleSubmit = () => {
    const timeFromMinutes = parseTime(newBreakRequest.timeFrom);
    const timeToMinutes = parseTime(newBreakRequest.timeTo);
    const breakDuration = timeToMinutes - timeFromMinutes;

    const newRequest = {
      id: generateRandomId(),
      userName: "Melad Abulail",
      timeFrom: newBreakRequest.timeFrom,
      timeTo: newBreakRequest.timeTo,
      accepted: null,
    };

    const newBreakRemainingTime = session.breakRemainingTime - breakDuration;

    setExceedTheLimit(breakDuration > session.breakRemainingTime);

    const newSession = {
      ...session,
      breakRemainingTime: newBreakRemainingTime,
      userBreaks: [...(session.userBreaks || []), newRequest],
    };

    setSession(newSession);

    localStorage.setItem("session", JSON.stringify(newSession));

    const newBreakRequests = [...breakRequests, newRequest];

    localStorage.setItem("breakRequests", JSON.stringify(newBreakRequests));
    setBreakRequests(newBreakRequests);
    setBreaks([newRequest]);
    setPaginatedData(
      Array.isArray(JSON.parse(localStorage.getItem("session")).userBreaks)
        ? JSON.parse(localStorage.getItem("session")).userBreaks.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
          )
        : []
    );
    setIsOpen(false);
  };

  useEffect(() => {
    const timeFromMinutes = parseTime(newBreakRequest.timeFrom);
    const timeToMinutes = parseTime(newBreakRequest.timeTo);
    const breakDuration = timeToMinutes - timeFromMinutes;

    setExceedTheLimit(breakDuration > session.breakRemainingTime);
  }, []);

  useEffect(() => {
    if (isOpen === false) {
      setNewBreakRequest({
        timeFrom: "8:00 AM",
        timeTo: "8:10 AM",
        reason: "Break",
      });
    }
  }, [isOpen]);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        dialogTitle="New Break Request"
        withoutSubmitButton={false}
        onConfirm={(e) => {
          handleSubmit();
        }}
        dialogContent={
          <>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                Remaining time: {session.breakRemainingTime} min
              </h3>
              <TimePicker
                value={newBreakRequest.timeFrom}
                onChange={(value) => handleTimeChange(value, "timeFrom")}
              />
              <TimePicker
                value={newBreakRequest.timeTo}
                onChange={(value) => handleTimeChange(value, "timeTo")}
              />
              <div className="flex">
                <h3 className="text-2xl font-semibold">Reason: </h3>
                <div className="mx-4 w-full">
                  <SelectComponent
                    options={options}
                    onChange={handleSelectChange}
                  />
                </div>
              </div>
              {exceedTheLimit && (
                <div>
                  <h3 className="text-2xl font-semibold text-red-600">
                    Exceed the limit{" "}
                  </h3>
                </div>
              )}
            </div>
          </>
        }
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-center"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-center">
                    {column.key === "accepted" ? (
                      <span
                        className={
                          row[column.key] === true
                            ? "text-green-600 font-medium"
                            : row[column.key] === false
                            ? "text-red-600 font-medium"
                            : "text-orange-600 font-medium"
                        }
                      >
                        {row[column.key] === true
                          ? "Accepted"
                          : row[column.key] === false
                          ? "Rejected"
                          : "Pending"}
                      </span>
                    ) : column.render ? (
                      column.render(row[column.key], row)
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between my-4 mx-4">
        <div>
          <button
            className="bg-[#f98232] px-4 py-2 rounded-md text-white cursor-pointer"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Request New Break
          </button>
        </div>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;
