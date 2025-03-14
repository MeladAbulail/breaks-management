import React, { useEffect, useState } from "react";
import Timeline from "../../../Components/Timeline/Timeline";

const AdminHomePage = () => {
  const [events, setEvents] = useState([]);

  function getIntervals() {
    const intervals = [];
    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0);
    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0);

    while (startTime <= endTime) {
      intervals.push(
        startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      startTime.setMinutes(startTime.getMinutes() + 10);
    }

    let value = intervals.map((item, index) => ({
      id: index + 1,
      title: `Event ${index + 1}`,
      userName: `Feras ${index + 1}`,
      description: `Description of Event ${index + 1}`,
      time: item,
    }));

    setEvents(value);
  }

  useEffect(() => {
    getIntervals();
  }, []);

  return (
    <div>
      <Timeline events={events} />
    </div>
  );
};

export default AdminHomePage;
