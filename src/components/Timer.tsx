import { useState, useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu"

function formatTime(date : Date) {

    return date.getMinutes() + ":" + date.getSeconds();
}

function Timer() {

    const [timerActive, setTimerActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    //const [timeStart, setTimeStart] = useState(Date.now());

    let timeStart = Date.now();

    const [timer, setTimer] = useState<ReturnType<typeof setInterval> | 0>(0);


    const startTimer = () => {
        setTimerActive(true);
        
        timeStart = Date.now();
        setCurrentTime( Date.now() - timeStart );

        let interval = setInterval( () => {
            setCurrentTime( Date.now() - timeStart );
        }, 250);

        setTimer(interval);
    }

    function resetTimer() {
        setTimerActive(false);

        clearInterval(timer);
    }

    function toggleTimer() {
        if (timerActive) {
            resetTimer();
        }
        else {
            startTimer();
        }
    }

    return (
        <>
            <button type="button" className={"btn btn-outline-dark"} onClick={ toggleTimer }>
                <div style={{display: "flex"}} align-content="flex-end">
                    <div style={{margin: "0px 5px", position: "relative", top: "-2px"}}>
                        <LuAlarmClock size={20}/>
                    </div>
                    <div style={{margin: "0px 5px"}}>
                        {timerActive && formatTime(new Date(currentTime))}
                        {!timerActive && "--:--"}
                    </div>
                </div>
            </button>
        </>
    )
}

export default Timer;