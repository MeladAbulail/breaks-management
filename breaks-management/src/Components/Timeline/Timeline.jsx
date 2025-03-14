import React from "react";
import ProfileSideCard from "../ProfileSideCard/ProfileSideCard";

const Timeline = ({ events }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative wrap overflow-hidden">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
        {events.map((event, index) => (
          <ProfileSideCard key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
