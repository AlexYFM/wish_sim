import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Roll from './Roll'

function App() {
  const [rolls, setRolls] = useState([])
  const [golds, setGolds] = useState(0)
  let pity = 0

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
        if(pity++===90){ // hit pity
          ten.push('gold')
          pity = 0
          setGolds(golds+1)
          break
        }
        if (Math.random()*100 < p){
          ten.push(rarity)
          if (rarity==='gold'){
            pity = 0
            setGolds(golds+1)
          }
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
      <div style={{display: 'flex', marginBottom: '1rem'}}>
        {rolls.map((roll) => {
          return  <Roll rarity={roll}/> 
        })}
      </div>
      <button onClick={rollTen}>Roll 10</button>
    </div>
  )
}

export default App
