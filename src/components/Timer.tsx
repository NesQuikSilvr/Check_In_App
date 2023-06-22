import { useState, useRef, useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu"


function Timer() {

    function parseTime(time: Date) {

        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();

        return {
            hours, minutes, seconds
        };
    }

    const [currentTime, setCurrentTime] = useState(0);

    useEffect( () => {
        setTimeout( () => {
            setCurrentTime( () => currentTime );
        }, 500);
    }, [currentTime])

    return (
        <>
            <button type="button" className={"btn btn-outline-dark"}>
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