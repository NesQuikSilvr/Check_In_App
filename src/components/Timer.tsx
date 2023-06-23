import { useState, useRef, useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu"


function Timer() {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    
    const [timerActive, setTimerActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(Date.now());

    function startTimer() {
        setCurrentTime(0);
        setTimerActive(true);
    }

    let timer : ReturnType<typeof setInterval> = 0;
    
    useEffect( () => {
        if (timerActive) {
            timer = setInterval( () => {
                setCurrentTime( currentTime + 1 );
                console.log("tick");
            }, 500);
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
                        {new Date(currentTime).getHours() + ":" + new Date(currentTime).getMinutes() + ":" + new Date(currentTime).getSeconds()}
                    </div>
                </div>
            </button>
        </>
    )
}

export default Timer;