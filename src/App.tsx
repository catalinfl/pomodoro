import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Tomato from './components/Tomato'
import './index.scss'

function App() {

  return (
    <div className="App">
      <Header />
      <Tomato />
      <Footer />
    </div>
  )
}

export default App
