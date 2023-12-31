import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Roll from './Roll'

function App() {
  const [rolls, setRolls] = useState([])
  const [golds, setGolds] = useState(0)
  const [numRolls, setNumRolls] = useState(0)
  const [pity, setPity] = useState(0)
  const [guar, setGuar] = useState(false)

  const chance = {
    gold: 1.6,
    purple: 13,
    blue: 85.4
  }

  const roll = async (n) => {
    let lastRoll = ''
    let localPity = pity
    let localRolls = []
    let localG = guar
    for(let i=0; i<n; i++){
      let p = 0
      for (const [rarity, prob] of Object.entries(chance)){
        p += prob
        if (Math.random()*100 < p){
          lastRoll = rarity
          break
        }
      }
      if (++localPity===90) lastRoll = 'gold'
      if (lastRoll==='gold'){
        localPity = 0
        setGolds(g => g+1)
        if (Math.random()>0.50 || localG){
          localG = false
          lastRoll += ' on_banner'
        }
        else localG = true
      }
      localRolls.push(lastRoll)
    }
    setRolls(prev => [...prev, ...localRolls].slice(-10))
    setNumRolls(num => num + n)
    setPity(localPity)
    setGuar(localG)
  }
  
  return (
    <div style={{alignItems: 'center'}}>
      <h1>Roll Simulator</h1>
      <hr/>
      <h6>Number of 5 stars: {golds}</h6>
      <h6>Number of rolls: {numRolls}</h6>
      <h6>Pity: {pity}</h6>
      <h6>Guarantee: {guar ? "Yes" : "No"}</h6>
      <h6>Computed chance of a 5*: {numRolls ? (golds/numRolls*100).toFixed(2)+"%": "No rolls completed yet."}</h6>
      <h6>Probability of getting 5* before pity: {((1-(0.994)**(90-pity))*100).toFixed(2)+"%"}</h6>
      <hr/>
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
