import { useEffect, useState } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (value, divisor, mod) =>
    ("0" + Math.floor((value / divisor) % mod)).slice(-2);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Stopwatch</h1>
      <div className="text-4xl font-mono bg-white text-gray-800 rounded-lg px-6 py-3 shadow-md mb-8 tracking-widest">
        <span>{formatTime(time, 60000, 60)}:</span>
        <span>{formatTime(time, 1000, 60)}:</span>
        <span>{formatTime(time, 10, 100)}</span>
      </div>
      <div className="flex space-x-4">
        <button
          className={`border-2 border-white rounded-full py-2 px-6 font-semibold transition-transform transform ${
            running ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => setRunning(!running)}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          className="border-2 border-white bg-blue-500 hover:bg-blue-600 rounded-full py-2 px-6 font-semibold transition-transform transform"
          onClick={() => setTime(0)}
          disabled={time === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;