import React, { useState } from "react";
import { Progress } from "reactstrap";

interface ProgressBarEtaProps {
    percentComplete: number;
    eta: Date;
    actualFinishTime: Date;
}

function ProgressBarEta({ percentComplete, eta, actualFinishTime }: ProgressBarEtaProps) {
    const [etaDiff, setEtaDiff] = useState<number>(0);

    const calculateEtaDiff = () => {
        const diff = actualFinishTime.getTime() - eta.getTime();
        setEtaDiff(Math.round(diff / 1000 / 60));
    };

    const getProgressBarColor = () => {
        if (percentComplete > 100) {
            return "red";
        } else if (percentComplete >= 90) {
            return "warning";
        } else if (etaDiff < 0) {
            return "red";
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
            width: `${percentComplete}%`
        };
    };

    return (
        <div>
            <div className="progress" style={getProgressBarStyle()}></div>
            {etaDiff < 0 && (
                <span style={{ color: "green" }}>
                    Finish {Math.abs(etaDiff)} min before eta
                </span>
            )}
        </div>
    );
}

export { ProgressBarEta }