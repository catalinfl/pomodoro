import React, { useLayoutEffect } from 'react'
import TomatoImage from '../assets/tomato.svg'
import gsap, { Power3 } from 'gsap'



type TomatoEffectType = {
    margin: string
}

const TomatoEffect = ({ margin }: TomatoEffectType) => {
    useLayoutEffect(() => {
        let tween = gsap.fromTo(
            ".runningTomato", 
            {
            y: "-100vh",
            }, 
            {y: "30vh",
            duration: 20,
            ease: Power3.easeIn,
            stagger: 5
        }).repeat(-1)
    }, [])


  return (
    <img src={TomatoImage} className="runningTomato" style={{marginLeft: margin}}/> 
)
}

export default TomatoEffect