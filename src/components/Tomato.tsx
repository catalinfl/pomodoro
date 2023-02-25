import './Tomato.scss'
import React, { useEffect, useLayoutEffect } from 'react'
import tomato from '../assets/tomato.svg'
import { useState } from 'react'
import { useRef } from 'react'
import gsap, { Power2, Power4, Power1 } from 'gsap'
import { useTimer } from 'react-timer-hook'
import Timer from './Timer'
import PauseTimer from './PauseTimer'



const Tomato = () => {
    
    
    const [workTime, setWorkTime] = useState<number>(0);
    const [pauseTime, setPauseTime] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<boolean>(false);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [activateTimer, setActivateTimer] = useState<boolean>(false);
    const [startPauseTime, setStartPauseTime] = useState<boolean>(false);
    const [countPomodoros, setCountPomodoros] = useState<number>(0);
    
    
    const tomatoAnim = useRef<HTMLDivElement>(null);
    const timeline = useRef<GSAPTimeline | null>(null);
    const tomatoImageRef = useRef<HTMLImageElement>(null)
    const inputRef = useRef<HTMLDivElement>(null);
    const timelineDisappear = useRef<GSAPTimeline | null>(null);
    const startButtonRef = useRef<HTMLButtonElement>(null)
    
    
    const startPauseTimeFunc = () => {
        setStartPauseTime(true);
        setCountPomodoros(countPomodoros+1);
    }

    console.log(countPomodoros)

    const stopPauseTimeFunc = () => {
        setStartPauseTime(false);
    }

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
        if (!maxValue) {
            timelineDisappear.current = gsap.timeline()
            .fromTo(".tomatoImage", 
            {x: 0},
            {x: -1000,
            duration: 3,
            opacity: 0,
            ease: Power2.easeInOut,
            rotate: "35deg"
        })
            .to(".inputContainer", {
                x: -1000,
                duration: 0.5,
                opacity: 0,
                ease: Power1.easeOut
            })
            .to(".tomatoStart", {
                scale: 0,
                duration: 0.5,
                onComplete: onComplete
            })
        }
        else {
                timelineDisappear.current = gsap.timeline()
                .fromTo(".tomatoImage", 
                {x: 10,
                 y: 35,
                 scale: 0.8
                },
                {x: -1000,
                duration: 3,
                opacity: 0,
                ease: Power2.easeInOut,
                rotate: "35deg"
            })
                .to(".inputContainer", {
                    x: 1000,
                    opacity: 0,
                    duration: 2,
                    ease: Power4.easeOut
                })
                .to(".tomatoStart", {
                    scale: 0,
                    duration: 1,
                    onComplete: onComplete,
                })
        }
    }
    }, [isTimerActive])
        
    const onComplete = () => {
        tomatoAnim.current?.remove();
        tomatoImageRef.current?.remove();
        startButtonRef.current?.remove();
        setActivateTimer(true);
    }

    useEffect(() => {
        timeline.current?.reversed(!maxValue);
    }, [maxValue])
    
    const setTimer = (value: string) => {
        let workTimer = parseInt(value);
        if (workTimer > 40) {
            setMaxValue(true);
            setWorkTime(40)
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
        setPauseTime(Math.ceil(workTime/5))
        setMaxValue(false)
        }
        else { 
            setPauseTime(8)
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

    
    const workTimerFunc = (): Date => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + workTime)
        return time;
    }


    const pauseTimerFunc = (): Date => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + pauseTime)
        return time;
    }

    const startButton = () => {
        if (workTime > 0) {
        setIsTimerActive(true);
        }
    }



  return (
    <div className="principal"> 
    <div className="tomato justify-center"> 
    <div className="inputContainer" ref={tomatoAnim}> 
        <p className="inputText"> Time at work (min) </p>
        <input className="inputTime" type="number" ref={workRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimer(e.target.value)} placeholder='Working time' max="40" pattern="[0-9]"/>
        <p className="inputText"> Time to pause (min) </p>
        <input className="inputTime" type="number" ref={pauseRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPauseTimer(e.target.value)} value={pauseTime} max="40" />
        {workTime >= 1 && workTime.toString() !== "NaN" ? 
        <p className="inputText"> You have {workTime} minutes of work, then {pauseTime} minutes of pause </p> : null}
        {maxValue ? <p className="inputText"> You have reached max value, maximum 40 minutes admitted </p> : null }
    </div>
        <button className="tomatoStart" onClick={startButton} ref={startButtonRef}> Start </button>
        <img className="tomatoImage" src={tomato} ref={tomatoImageRef}/>
        { activateTimer ? 
        <div className="tomatoTimer"> 
        { startPauseTime ? <PauseTimer expiryTimestamp={pauseTimerFunc()} stopPauseTimeFunc={stopPauseTimeFunc} countPomodoros={countPomodoros}/> :        
        <Timer expiryTimestamp={workTimerFunc()} startPauseTimeFunc={startPauseTimeFunc}/>
        }
        </div>
        : null }
        </div>
    </div>
    )
}

export default Tomato