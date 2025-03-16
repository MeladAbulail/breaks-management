import React from "react";
import FerasProfile from "../../assets/FerasProfile.jpg";

function TimelineItem({ item }) {
  return (
    <div className="w-[400px] h-[75px]">
      <div className="bg-white flex justify-center items-center py-1">
        <div className="border border-gray-800 shadow rounded-md p-2 sm:p-3 lg:p-4 max-w-sm w-full mx-auto">
          <div className="flex space-x-3">
            <img
              src={FerasProfile}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-1 border-gray-800"
            />
            <div className="flex-1 justify-center align-middle py-1">
              <p>{item.userName}</p>
              <p>
                {item.timeFrom} - {item.timeTo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineItem;
