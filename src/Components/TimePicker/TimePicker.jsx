import React, { useState, useEffect } from "react";

const TimePicker = ({ value = "12:00 AM", onChange }) => {
  const parseTime = (timeStr) => {
    if (!timeStr) return { hours: "12", minutes: "00", ampm: "AM" };

    const [time, period] = timeStr.split(" ");
    if (!time || !period) return { hours: "12", minutes: "00", ampm: "AM" };

    const [hours, minutes] = time.split(":");
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      ampm: period,
    };
  };

  const [time, setTime] = useState(parseTime(value));

  useEffect(() => {
    const formattedTime = `${time.hours}:${time.minutes} ${time.ampm}`;
    if (value !== formattedTime) {
      onChange(formattedTime);
    }
  }, [time]);

  const handleChange = (field, newValue) => {
    setTime((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={time.hours}
        onChange={(e) => handleChange("hours", e.target.value)}
        className="border p-2 rounded-md w-16 text-center appearance-none pr-6"
        aria-label="Select hour"
      >
        {Array.from({ length: 12 }, (_, index) => {
          const hour = String(index + 1).padStart(2, "0");
          return (
            <option key={hour} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
      <span className="text-lg">:</span>
      <select
        value={time.minutes}
        onChange={(e) => handleChange("minutes", e.target.value)}
        className="border p-2 rounded-md w-16 text-center appearance-none pr-6"
        aria-label="Select minute"
      >
        {Array.from({ length: 60 }, (_, index) => {
          const minute = String(index).padStart(2, "0");
          return (
            <option key={minute} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
      <select
        value={time.ampm}
        onChange={(e) => handleChange("ampm", e.target.value)}
        className="border p-2 rounded-md w-20 text-center appearance-none pr-6"
        aria-label="Select AM/PM"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      <style jsx>{`
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          padding-right: 2rem; /* Extra space for arrow */
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>');
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          background-size: 1rem;
        }

        select:focus {
          outline: none;
          border-color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default TimePicker;
