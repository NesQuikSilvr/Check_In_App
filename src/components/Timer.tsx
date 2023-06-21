import { useState, useEffect } from "react";

function Timer() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect( () => {
        setTimeout( () => {
            setCurrentTime( () => new Date() );
        }, 1000);
    })

    return (
        <div align-content="flex-end">
            {currentTime.toTimeString()}
        </div>
    )
}

export default Timer;