import React from 'react'
import { useTimer } from 'react-timer-hook'

type ExpireTime = {
    expiryTimestamp: Date
}

function Timer({ expiryTimestamp }: ExpireTime): JSX.Element {

    const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
        expiryTimestamp, onExpire: () => console.log("It expired")
    })
    
    return (
        <p> test </p>
    )
}

export default Timer