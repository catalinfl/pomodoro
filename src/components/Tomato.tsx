import './Tomato.scss'
import React, { useEffect } from 'react'
import tomato from '../assets/tomato.svg'
import { useState } from 'react'
import { useRef } from 'react'



const Tomato = () => {
    const [workTime, setWorkTime] = useState<number>(0);
    const [pauseTime, setPauseTime] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<boolean>(false);

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
        }
        ;
    }, [workTime])

    const workRef = useRef<HTMLInputElement>(null);
    const pauseRef = useRef<HTMLInputElement>(null);


  return (
    <div className="tomato justify-center"> 
    <div className="inputContainer"> 
        <p className="inputText"> Time at work (min) </p>
        <input className="inputTime" type="text" ref={workRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimer(e.target.value)} placeholder='Working time' max="100" min="0"/>
        <p className="inputText"> Time to pause (min) </p>
        <input className="inputTime" type="text" ref={pauseRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPauseTimer(e.target.value)} value={pauseTime} max="100" min="0" defaultValue="0"/>
        {workTime >= 0 && workTime.toString() !== "NaN" ? 
        <p className="inputText"> You have {workTime} minutes of work, then {pauseTime} minutes of pause </p> : null}
        {maxValue ? <p className="inputText"> You have reached max value </p> : null }
    </div>
        <img className="tomatoImage mx-auto" src={tomato}/>
    </div>
    )
}

export default Tomato