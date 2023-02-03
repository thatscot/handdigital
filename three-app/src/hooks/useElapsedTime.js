import { format } from "date-fns";
import { useEffect, useState } from "react";

const useElapsedTime = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const start = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setStartTime(0);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(() => Date.now() - startTime);
      }, 1);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Might wanna return unformatted time here and format in components 🤷‍♀️
  return { elapsedTime: format(time, "s.S"), start, stop, reset };
};

export { useElapsedTime };
