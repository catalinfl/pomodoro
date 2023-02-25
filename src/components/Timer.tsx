import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import './Timer.scss'
import gsap, { Cubic, Power3 } from 'gsap'
import TomatoEffect from './TomatoEffect'
import { Howl } from "howler"

type ExpireTime = {
    expiryTimestamp: Date,
    startPauseTimeFunc: () => void
}

function Timer({ expiryTimestamp, startPauseTimeFunc }: ExpireTime): JSX.Element {
    const [timerExpired, setTimerExpired] = useState<boolean>(false);
    const [isTimerNotPaused, setIsTimerNotPaused] = useState<boolean>(true);
    const [tomatoAnims, setTomatoAnims] = useState<boolean>(true);
    
    const onExpire = () => {
        setTimeout(() => {
        setTimerExpired(true)
        gsap.to(".workTimer", {
            opacity: 0,
            duration: 1
        })
        gsap.to(".stop", {
            x: -1500,
            duration: 1,
            ease: Power3.easeIn
        })
        gsap.to(".stopAnim", {
            x: 1500,
            duration: 1,
            ease: Power3.easeIn
        })
        gsap.to(".workDialog", {
            duration: 1,
            scale: 2,
            opacity: 0
        })
        gsap.to(".runningTomato", {
            opacity: 0,
            duration: 1
        })
        setTimeout(() => { 
            startPauseTimeFunc()
            dialogRef.current?.remove()
            timerRef.current?.remove()
            buttonsRef.current?.remove()
        }
        , 5000)
        var sound = new Howl({
            src: ['/yay.mp3']
        })
        sound.play()
    }, 2000)
}

var { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
        expiryTimestamp, onExpire: onExpire
    })    

    const timerRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<GSAPTimeline | null>(null)
    const dialogRef = useRef<HTMLParagraphElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)


    useLayoutEffect(() => {
        timeline.current && timeline.current.progress(0).kill();
        timeline.current = gsap.timeline()
        .fromTo(".workTimer", {
            x: -1200,
        }, { x: 0,
            duration: 1,
            ease: Cubic.easeIn
        })
        gsap.fromTo(".workDialog", {
            opacity: 0, scale: 2
        }, {
            opacity: 1, scale: 1, duration: 2
        })
        gsap.fromTo(".stop", {
            x: "-100vw",
            duration: 1,
        }, { x: 0 })
        gsap.fromTo(".stopAnim", {
            x: "100vw",
            duration: 1,
        }, { x: 0 })
    }, [])

    const pauseTime = () => {
        setIsTimerNotPaused(!isTimerNotPaused)
        if (isTimerNotPaused) {
        pause()
        }
        else resume()
    }

    return (
        <div className="timerContainer"> 
        <p className="workDialog" ref={dialogRef}> Working time &#9997; </p>
        <div className="workTimer" ref={timerRef}style={ (minutes === 0 && seconds >= 10 && seconds <= 40) ? { color: "orange"} : (minutes === 0 && seconds <= 10) ? { color: "red"} : { color: "white" } } > 
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
        <div className="buttonFlex" ref={buttonsRef}> 
        <button className="timerButton stop" onClick={pauseTime}> {isTimerNotPaused ? "Pause time" : "Time paused"} </button>
        <button className="timerButton stopAnim" onClick={() => setTomatoAnims(!tomatoAnims)}> {tomatoAnims ? "Stop tomato anims" : "Start tomato anims"} </button>
        </div>
        {tomatoAnims ?
        <div className="anims">  
        <TomatoEffect margin={"5vw"}/>
        <TomatoEffect margin={"35vw"}/>
        <TomatoEffect margin={"20vw"}/>
        <TomatoEffect margin={"75vw"}/>
        <TomatoEffect margin={"50vw"}/>
        </div>
        : null}

        </div>
        )
}

export default Timer