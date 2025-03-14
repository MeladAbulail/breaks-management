import React from "react";
import Profile from "../../assets/FerasProfile.jpg";

const ProfileSideCard = ({ event, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`mb-8 flex justify-between items-center w-full ${
        isEven ? "flex-row" : "flex-row"
      } sm:justify-end`}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full">
        <h1 className="mx-auto font-semibold text-xs sm:text-sm lg:text-lg text-white">
          {event.number}
        </h1>
      </div>
      <div className="order-1 w-5/12 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
        <div className="bg-white flex justify-center items-center py-1">
          <div className="border border-[#282d3c] shadow rounded-md p-2 sm:p-3 lg:p-4 max-w-sm w-full mx-auto">
            <div className="flex space-x-3">
              <img
                src={Profile}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2  border-[#282d3c]"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              <div className="flex-1 justify-center align-middle py-1">
                <p>{event.userName}</p>
                <p>{event.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideCard;
