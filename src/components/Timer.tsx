import { useState, useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu"


function Timer() {

    const [timerActive, setTimerActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [timeStart, setTimeStart] = useState(Date.now());

    function startTimer() {
        setTimeStart(Date.now());
        console.log("Started timer" + timeStart);
        setCurrentTime(0);
        setTimerActive(true);
    }

    let timer : ReturnType<typeof setInterval> = 0;
    
        useEffect( () => {
            if (timerActive) {
                timer = setInterval( () => {
                    setCurrentTime( Date.now() - timeStart );
                }, 250);
            }

            return () => {
                clearInterval(timer);
            }
        }, [currentTime])

    return (
        <>
            <button type="button" className={"btn btn-outline-dark"} onClick={ startTimer }>
                <div style={{display: "flex"}} align-content="flex-end">
                    <div style={{margin: "0px 5px", position: "relative", top: "-2px"}}>
                        <LuAlarmClock size={20}/>
                    </div>
                    <div style={{margin: "0px 5px"}}>
                        {new Date(currentTime).getMinutes() + ":" + new Date(currentTime).getSeconds()}
                    </div>
                </div>
            </button>
        </>
    )
}

export default Timer;