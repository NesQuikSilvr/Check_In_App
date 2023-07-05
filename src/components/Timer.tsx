import { useState,useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu"

const expiration = 3600000;

function formatTime(date : Date) {
    let time = "";
    if (date.getMinutes() < 10) {
        time = "0" + date.getMinutes().toString();
    }
    else {
        time = date.getMinutes().toString();
    }

    time += ":";

    if (date.getSeconds() < 10) {
        time += "0" + date.getSeconds().toString();
    }
    else {
        time += date.getSeconds().toString();
    }

    return time;
}

function TimerComponent() {

    const [timerIsActive, setTimerActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [timer, setTimer] = useState<ReturnType<typeof setInterval> | 0>(0);

    const startTimer = () => {
        setTimerActive(true);
        
        let timeStart = Date.now();
        console.log("Set time start: " + new Date(timeStart).toLocaleTimeString());
        
        setCurrentTime( Date.now() - timeStart );
        let interval = setInterval( () => {
            setCurrentTime( Date.now() - timeStart );
        }, 100);

        setTimer(interval);
    }

    const resetTimer = () => {
        setTimerActive(false);
        clearInterval(timer);
    }

    const toggleTimer = () => {
        if (timerIsActive) {
            resetTimer();
        }
        else {
            startTimer();
        }
    }

    useEffect(() => {
        if (currentTime > expiration) {
            console.log("Timer expired at: " + Date.now().toLocaleString());
            resetTimer();
        }
    }, [currentTime]);

    return (
        <>
            <button type="button" className={"btn btn-outline-dark btn-sm"} onClick={ toggleTimer }>
                <div style={{display: "flex"}} align-content="flex-end">
                    <div style={{margin: "0px 5px", position: "relative", top: "-2px"}}>
                        <LuAlarmClock size={20}/>
                    </div>
                    <div style={{margin: "0px 5px"}}>
                        {timerIsActive && formatTime(new Date(currentTime))}
                        {!timerIsActive && "--:--"}
                    </div>
                </div>
            </button>
        </>
    )
}

export { TimerComponent };