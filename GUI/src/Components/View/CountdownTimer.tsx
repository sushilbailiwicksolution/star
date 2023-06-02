import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AirCraftDetailInterval } from "../../Config/siteConfig";
import "./view.css";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(AirCraftDetailInterval / 1000);
  const [timerRunning, setTimerRunning] = useState(true);

  const viewReducerResponse = useSelector((state: any) => state.viewReducer);

  useEffect(() => {
    if (viewReducerResponse.startTimer) {
      handleStart();
    } else {
      handleStop();
    }
  }, [viewReducerResponse.startTimer]);

  useEffect(() => {
    let intervalId: any;

    if (timerRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }

    if (timerRunning && timeLeft < 1) {
      handleStart();
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(AirCraftDetailInterval / 1000);
    setTimerRunning(true);
  };

  const handleStop = () => {
    setTimeLeft(0);
    setTimerRunning(false);
  };

  // const handleReset = () => {
  //   setTimeLeft(AirCraftDetailInterval / 1000);
  //   setTimerRunning(true);
  // };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="countTimer">
      {/* <h2>Countdown Timer</h2> */}
      <span>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
      {/* <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button> */}
    </div>
  );
};

export default CountdownTimer;
