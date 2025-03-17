import React from "react";

function RequestBreakDialogRow({
  request,
  handleAcceptBreakRequest,
  handleRejectBreakRequest,
}) {
  return (
    <>
      <div className="flex justify-between items-center   p-4 rounded-md">
        <div className="text-lg font-medium">{request.userName}</div>
        <div className="text-gray-600">
          {`${request.timeFrom} - ${request.timeTo}`}{" "}
        </div>
        <div className="flex space-x-3">
          <button
            className="bg-transparent border-1 border-red-600 text-red-600 px-2 py-1  rounded-sm transition cursor-pointer"
            onClick={(e) => {
              handleRejectBreakRequest(request.id);
            }}
          >
            Reject
          </button>
          <button
            className="bg-transparent  border-1 border-green-600 text-green-600   px-2 py-1 rounded-sm transition cursor-pointer"
            onClick={(e) => {
              handleAcceptBreakRequest(request.id);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </>
  );
}

export default RequestBreakDialogRow;
