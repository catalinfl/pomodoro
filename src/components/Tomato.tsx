import './Tomato.scss'
import React, { useEffect, useLayoutEffect } from 'react'
import tomato from '../assets/tomato.svg'
import { useState } from 'react'
import { useRef } from 'react'
import gsap, { Power2 } from 'gsap'
import { useTimer } from 'react-timer-hook'
import Timer from './Timer'



const Tomato = () => {
    
    
    const [workTime, setWorkTime] = useState<number>(0);
    const [pauseTime, setPauseTime] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<boolean>(false);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);



    const tomatoAnim = useRef<HTMLDivElement>(null);
    const timeline = useRef<GSAPTimeline | null>(null);
    const tomatoImageRef = useRef<HTMLImageElement>(null)
    const imageRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        if (!isTimerActive) {
            const context = gsap.context(() => {
                timeline.current && timeline.current.progress(0).kill();
                timeline.current = gsap.timeline()
                .to(".tomatoImage", {
                    y: 35,
                    x: 10,
                    scale: 0.8
            }).revert();
        })
        return () => context.revert();
    }
        else {
            let tween = gsap.fromTo(".tomatoImage", 
            {x: 0},
            {x: -1000,
            duration: 5,
            opacity: 0,
            onComplete: onComplete,
            ease: Power2.easeInOut,
            rotate: "35deg"
        })
        }
    }, [isTimerActive])
        
    const onComplete = () => {
        tomatoImageRef.current?.remove()
    }

    useEffect(() => {
        timeline.current?.reversed(!maxValue);
    }, [maxValue])

    
    
    const setTimer = (value: string) => {
        let workTimer = parseInt(value);
        if (workTimer > 100) {
            setMaxValue(true);
            setWorkTime(100)
        }
        else setWorkTime(parseInt(value))
    }

    const setPauseTimer = (value: string) => { 
        let pauseTimer = parseInt(value);
        if (pauseTimer > parseInt(pauseRef.current?.max as string)) {
            setPauseTime(parseInt(pauseRef.current?.max as string))
        }
        else if (pauseTimer > 0 && value !== "NaN") {
            setPauseTime(pauseTimer)
        }
    }

    useEffect(() => {
        if (workTime < parseInt(workRef.current?.max as string)) {
        setPauseTime(Math.trunc(workTime/5))
        setMaxValue(false)
        }
        else { 
            setPauseTime(20)
            setMaxValue(true);
        }
        if (workRef.current?.value === "") {
            setMaxValue(false)
            setPauseTime(0)
        }
        ;
    }, [workTime])

    const workRef = useRef<HTMLInputElement>(null);
    const pauseRef = useRef<HTMLInputElement>(null);

    
    function testFunc(): Date {
        const time = new Date();
        time.setSeconds(time.getSeconds() + workTime)
        return time;
    }



  return (
    <div className="principal"> 
    <div className="tomato justify-center"> 
    <div className="inputContainer" ref={tomatoAnim}> 
        <p className="inputText"> Time at work (min) </p>
        <input className="inputTime" type="text" ref={workRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimer(e.target.value)} placeholder='Working time' max="100"/>
        <p className="inputText"> Time to pause (min) </p>
        <input className="inputTime" type="text" ref={pauseRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPauseTimer(e.target.value)} value={pauseTime} max="100" />
        {workTime >= 1 && workTime.toString() !== "NaN" ? 
        <p className="inputText"> You have {workTime} minutes of work, then {pauseTime} minutes of pause </p> : null}
        {maxValue ? <p className="inputText"> You have reached max value </p> : null }
    </div>
        <button className="tomatoStart" onClick={() => setIsTimerActive(!isTimerActive)}> {isTimerActive ? "Stop" : "Start"} </button>
        <img className="tomatoImage" src={tomato} ref={tomatoImageRef}/>
    </div>
    <div className="tomatoTimer"> 
       { isTimerActive 
       ? <Timer expiryTimestamp={testFunc()}/>
       : null 
        }
    </div>
    </div>
    )
}

export default Tomato