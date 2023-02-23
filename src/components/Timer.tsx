import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import './Timer.scss'
import gsap, { Cubic } from 'gsap'
import TomatoEffect from './TomatoEffect'

type ExpireTime = {
    expiryTimestamp: Date
}

function Timer({ expiryTimestamp }: ExpireTime): JSX.Element {
    const [timerExpired, setTimerExpired] = useState<boolean>(false);

    var { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
        expiryTimestamp, onExpire() {
            setTimerExpired(true)
        },
    })
    
    useEffect(() => {
        console.log(timerExpired)
    }, [seconds])

    const timerRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<GSAPTimeline | null>(null)
    const secondTimeline = useRef<GSAPTimeline | null>(null)
    
    useLayoutEffect(() => {
        timeline.current && timeline.current.progress(0).kill();
        timeline.current = gsap.timeline()
        .fromTo(".workTimer", {
            x: -1200,
        }, { x: 0,
            duration: 1,
            ease: Cubic.easeIn
        })
    }, [])

    return (
        <div className="timerContainer"> 
        <div className="workTimer" ref={timerRef}> 
        {minutes >= 10
        ? <p> {minutes} </p>
        : <p> 0{minutes} </p>
        }
        :
        {seconds >= 10 
        ? <p> {seconds} </p>
        : <p> 0{seconds} </p>
        }
        </div>
        <TomatoEffect margin={"5vw"}/>
        <TomatoEffect margin={"20vw"}/>
        <TomatoEffect margin={"35vw"}/>
        <TomatoEffect margin={"50vw"}/>
        <TomatoEffect margin={"75vw"}/>
        </div>
        )
}

export default Timer