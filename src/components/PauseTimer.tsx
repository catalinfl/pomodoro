import React, { useEffect, useLayoutEffect, useState } from 'react'
import gsap, { Power3 } from 'gsap'
import { useTimer } from 'react-timer-hook'
import { Howl } from 'howler'

type PauseTimerType = {
    expiryTimestamp: Date,
    stopPauseTimeFunc: () => void,
}

const PauseTimer = ({ expiryTimestamp, stopPauseTimeFunc }: PauseTimerType) => {

    const [bigPause, setBigPause] = useState<boolean>(false);
    const onExpire = () => {
        setTimeout(() => {
            gsap.to(".workDialog", {
                y: "120vh", duration: 2, ease: Power3.easeIn  
            })
            gsap.to(".workTimer", {
                y: "-120vh", duration: 2, ease: Power3.easeIn
            })
            setTimeout(() => {
                stopPauseTimeFunc()
            }, 3000)
            var sound = new Howl({
                src: ['/pauseExpired.mp3']
            })    
            sound.play()
        }, 2000)
    }
    
    var { seconds, minutes } = useTimer({
        expiryTimestamp, onExpire: onExpire 
    })   
    

    useLayoutEffect(() => {
        gsap.fromTo(".workTimer", {
            x: "100vw"
        }, { x: 0, duration: 2, rotation: 720})
        gsap.fromTo(".workDialog", {
            scale: 3, opacity: 0
        }, {
            scale: 1, opacity: 1
        })
    }, [])
    return (

        <div className="pauseTimer"> 
        <p className="workDialog"> Time for a break! &#128515; </p>
        <div className="workTimer" style={ (minutes === 0 && seconds >= 10 && seconds <= 40) ? { color: "orange"} : (minutes === 0 && seconds <= 10) ? { color: "red"} : { color: "white" } } > 
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
    </div>
    )
}

export default PauseTimer