import './Tomato.scss'
import React from 'react'
import tomato from '../assets/tomato.svg'

const Tomato = () => {
  return (
    <div className="tomato justify-center"> 
    <div className="inputContainer"> 
        <input className="inputTime" type="text" placeholder='test'/>
        <input className="inputTime" type="text" placeholder='test'/>
        <input className="inputTime" type="text" placeholder='test'/>
    </div>
        <img className="tomatoImage mx-auto" src={tomato}/>
    </div>
    )
}

export default Tomato