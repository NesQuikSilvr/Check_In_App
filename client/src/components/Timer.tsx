import { useState,useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu"

const expiration = 6000;

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

class Timer {
    expiration = 6000
    start_time = 0
    current_time = 0
    timer_is_active = false
    interval_id = 0

    start() {
        this.timer_is_active = true
        this.start_time = Date.now()
        console.log("Set time start: " + new Date(this.start_time).toLocaleTimeString());

        this.interval_id = setInterval( () => {
            this.update()
        }, 200)
    }

    update() {
        this.current_time = Date.now() - this.start_time

        if (this.current_time > expiration) {
            this.clear()
        }
    }

    clear() {
        clearInterval(this.interval_id)
        this.interval_id = 0
    }
}

function TimerComponent() {
    const [timerIsActive, setTimerActive] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [timer, setTimer] = useState(0);

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
            console.log("Timer expired at: " + new Date().toLocaleTimeString());
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

export type { Timer }
export { TimerComponent }