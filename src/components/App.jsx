import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Roll from './Roll'

function App() {
  const [rolls, setRolls] = useState([])
  const chance = {
    gold: 1.6,
    purple: 13,
    blue: 85.4
  }

  function rollTen () {
    const ten = []
    for(let i=0; i<10; i++){
      let p = 0
      for (const [rarity, prob] of Object.entries(chance)){
        p += prob
        if (Math.random()*100 < p){
          ten.push(rarity)
          break
        }
      }
    }
    setRolls(ten)
  }
  
  return (
    <div style={{alignItems: 'center'}}>
      <h1>Roll Simulator</h1>
      <div style={{display: 'flex'}}>
        {rolls.map((roll) => {
          return  <Roll rarity={roll}/> 
        })}
      </div>
      <button onClick={rollTen}>Roll 10</button>
    </div>
  )
}

export default App
