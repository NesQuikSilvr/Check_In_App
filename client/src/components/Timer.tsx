import { useState,useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu"

const expiration = 15000;

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

interface TCProp {
    onPress: () => void
}

function TimerComponent({onPress}: TCProp) {
    const [timerIsActive, setTimerActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect( () => {
        startTimer()
    }, [])

    const startTimer = () => {
        setTimerActive(true);
        
        let timeStart = Date.now();
        console.log("Set time start: " + new Date().toLocaleTimeString());
        
        setCurrentTime( Date.now() - timeStart );
        let interval = setInterval( () => {
            setCurrentTime( Date.now() - timeStart );
        }, 100);

        setTimer(interval);
    }

    const resetTimer = () => {
        console.log('Reset timer')
        setTimerActive(false);
        clearInterval(timer);
    }

    const toggleTimer = () => {
        console.log('toggle timer')
        if (timerIsActive) {
            resetTimer();
        }
        else {
            startTimer();
        }
    }

    useEffect(() => {
        if (currentTime > expiration) {
            //console.log("Timer expired at: " + new Date().toLocaleTimeString());
            //resetTimer();
        }
    }, [currentTime]);

    return (
        <>
            <button type="button" className={"btn btn-outline-dark btn-sm"} onClick={ onPress }>
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

export { TimerComponent }