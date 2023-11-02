import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Roll from './Roll'

function App() {
  const [rolls, setRolls] = useState([])
  const [golds, setGolds] = useState(0)
  const [numRolls, setNumRolls] = useState(0)
  const [pity, setPity] = useState(0)

  const chance = {
    gold: 1.6,
    purple: 13,
    blue: 85.4
  }

  const roll = async (n) => {
    let lastRoll = ''
    const delay = () => new Promise(resolve => setTimeout(resolve, 0))
    for(let i=0; i<n; i++){
      let p = 0
      for (const [rarity, prob] of Object.entries(chance)){
        p += prob
        if (Math.random()*100 < p){
          lastRoll = rarity
          break
        }
      }
      setPity(p => p + 1)
      await delay()
      if (pity===90) lastRoll = 'gold'
      if (lastRoll==='gold'){
        setPity(0)
        setGolds(g => g+1)
      }
    }
    setRolls(prev => [...prev.slice(-9), lastRoll])
    setNumRolls(num => num + n )
    await delay()
  }
  
  return (
    <div style={{alignItems: 'center'}}>
      <h1>Roll Simulator</h1>
      <h2>Number of 5 stars: {golds}</h2>
      <h2>Number of rolls: {numRolls}</h2>
      <h2>Pity: {pity}</h2>
      <h3>Computed chance of a 5*: {numRolls ? (golds/numRolls*100).toFixed(2)+"%": "No rolls completed yet."}</h3>
      <div style={{display: 'flex', marginBottom: '1rem'}}>
        {rolls.map((roll, index) => {
          return  <Roll rarity={roll} key={index}/> 
        })}
      </div>
      <button onClick={() => roll(1)}>Roll 1</button>
      <button onClick={() => roll(10)}>Roll 10</button>
    </div>
  )
}

export default App
