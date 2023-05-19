import React, { useState, useEffect } from "react";
import { Progress } from "reactstrap";

interface ProgressBarEtaProps {
  start_time: string;
  end_time: string;
  eta_time: string;
}

function ProgressBarEta({ start_time, end_time, eta_time }: ProgressBarEtaProps) {
  const [percentComplete, setPercentComplete] = useState<number>(0);
  const [actualFinishTime, setActualFinishTime] = useState<Date | null>(null);
  const [etaDiff, setEtaDiff] = useState<number>(0);

  useEffect(() => {
    const startTime = new Date(start_time);
    const etaTime = new Date(eta_time);

    const currentTime = new Date();

    const elapsedTime = currentTime.getTime() - startTime.getTime();
    const totalDuration = etaTime.getTime() - startTime.getTime();

    const currentPercentComplete = (elapsedTime / totalDuration) * 100;
    setPercentComplete(currentPercentComplete);

    if (end_time !== null) {
      setActualFinishTime(new Date(end_time));
    }

    if (currentTime > etaTime) {
      const diff = currentTime.getTime() - etaTime.getTime();
      setEtaDiff(Math.round(diff / 1000 / 60));
    }
  }, []);

  const getProgressBarColor = () => {
    if (actualFinishTime !== null && actualFinishTime <= new Date(eta_time)) {
      return "gold";
    } else if (percentComplete > 100 || actualFinishTime !== null) {
      return "red";
    } else if (etaDiff < 0) {
      return "green";
    } else {
      return "orange";
    }
  };

  const getProgressBarStyle = () => {
    const color = getProgressBarColor();
    return {
      backgroundColor: color,
      width: '100%',
    };
  };

  return (
    <div>
      <Progress className="progress" style={getProgressBarStyle()} />
      {etaDiff < 0 && (
        <span style={{ color: "green",width:'100px' }}>
          {Math.abs(etaDiff)}
        </span>
      )}
    </div>
  );
}

export { ProgressBarEta };
