import React, { useState, useEffect } from "react";
import { Progress } from "reactstrap";

interface ProgressBarEtaProps {
    start_time: string;
    end_time: string;
    eta_time: string;
}

function ProgressBarEta({ start_time, end_time, eta_time ,}: ProgressBarEtaProps) {
    const [percentComplete, setPercentComplete] = useState<number>(0);
    const [actualFinishTime, setActualFinishTime] = useState<Date | null>(null);
    const [etaDiff, setEtaDiff] = useState<number>(0);

    useEffect(() => {
        const startTime = new Date(start_time);
        const etaTime = new Date(eta_time);

        const currentTime = new Date();
        console.log('11111111111111111', currentTime);

        const elapsedTime = currentTime.getTime() - startTime.getTime();
        console.log('ccc1111111111111', currentTime.getTime());
        console.log('ccc2222222222222', startTime.getTime());
        console.log('elapsedTime', elapsedTime);

        const totalDuration = etaTime.getTime() - startTime.getTime();
        console.log('totaldura111111111', etaTime.getTime());
        console.log('totaldur2222222222', startTime.getTime());

        console.log('totalDuration', totalDuration);

        const currentPercentComplete = (elapsedTime / totalDuration) * 100;
        console.log('currentPercentComplete', currentPercentComplete);


        setPercentComplete(currentPercentComplete);

        if (end_time !== null) {
            setActualFinishTime(new Date(end_time));
        }

        if (currentTime > etaTime) {
            const diff = currentTime.getTime() - etaTime.getTime();
            console.log('currentTime.getTime()', currentTime.getTime());
            console.log('etaTime.getTime()', etaTime.getTime());


            setEtaDiff(Math.round(diff / 1000 / 60));
        }
    }, []);

    const getProgressBarColor = () => {
        if (percentComplete > 100) {
            return "red";
        } else if (percentComplete >= 90) {
            return "warning";
        } else if (etaDiff < 0) {
            return "yellow";
        } else if (etaDiff === 0 && percentComplete === 100) {
            return "gold";
        } else {
            return "green";
        }
    };

    const getProgressBarStyle = () => {
        const color = getProgressBarColor();
        return {
            backgroundColor: color,
            width: `${percentComplete}%`,
        };
    };

    return (
        <div>
            <div className="progress-xs" style={getProgressBarStyle()}></div>
            {etaDiff < 0 && (
                <span style={{ color: "green" }}>
                    {Math.abs(etaDiff)}
                </span>
            )}
        </div>
    );
}

export { ProgressBarEta };
