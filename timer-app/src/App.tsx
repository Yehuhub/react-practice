import { useState } from "react";

const TIMER_MAX = 300;

const formatTime = (time: number): string => {
  const date = new Date(0);
  date.setSeconds(time);
  const timeString = date.toISOString().substring(11, 19);

  return timeString;
};

function App() {
  const [time, setTime] = useState<number>(TIMER_MAX);
  const [timer, setTimer] = useState<number | undefined>(undefined);

  const startTimer = (): void => {
    if (timer) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  const stopTimer = (): void => {
    clearInterval(timer);
    setTimer(undefined);
  };

  const resetTimer = (): void => {
    setTime(TIMER_MAX);
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <div>
        <button onClick={startTimer}>start</button>
        <button onClick={stopTimer}>stop</button>
        <button onClick={resetTimer}>reset</button>
      </div>
    </div>
  );
}

export default App;
