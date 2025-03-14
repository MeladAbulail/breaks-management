import React, { useEffect, useState } from "react";

const TimeCountDown = () => {
  const [timeLeft, setTimeLeft] = useState({
    // days: 15,
    // hours: 10,
    minutes: 24,
    seconds: 59,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // let { days, hours, minutes, seconds } = prev;
        let { minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
              else clearInterval(interval);
            }
          }
        }

        return { minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-row w-fit gap-8 ">
        <h1 className="text-5xl font-semibold text-left clearInterval text-[#202020] w-fit justify-center items-center">
          Time Left:
        </h1>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col bg-[#f98232] text-white rounded-lg shadow-lg h-20 w-20 justify-center items-center "
            >
              <span className="font-mono text-xl">{value}</span>
              <span className="uppercase text-sm">{unit}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimeCountDown;
