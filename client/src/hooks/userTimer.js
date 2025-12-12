import { useEffect, useState } from "react";

export default function useTimer(startImmediately = true) {
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(startImmediately);

  useEffect(() => {
    if (!startImmediately) return;
    // Set start time during initial render (before effects run)
    setStartTime(Date.now());
  }, [startImmediately]);

  useEffect(() => {
    if (!startTime || !running) return;

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, running]);

  const stop = () => setRunning(false);

  const formattedTime = (elapsed / 1000).toFixed(1);

  return { startTime, elapsed, formattedTime, stop };
}
