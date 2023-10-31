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

  function rollTen () {
    const ten = []
    for(let i=0; i<10; i++){
      let p = 0
      setNumRolls((prev) => prev+1)
      if(pity>=90){ // hit pity
        ten.push('gold')
        setPity(0)
        setGolds(golds+1)
        continue
      }
      for (const [rarity, prob] of Object.entries(chance)){
        p += prob
        if (Math.random()*100 < p){
          ten.push(rarity)
          if (rarity==='gold'){
            setPity(0)
            setGolds(golds+1)
          }
          else setPity((prev) => prev+1)
          break
        }
      }
    }
    setRolls(ten)
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
      <button onClick={rollTen}>Roll 10</button>
    </div>
  )
}

export default App
