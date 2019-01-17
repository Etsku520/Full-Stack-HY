import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
          sovellusta käytetään nappeja painelemalla
        </div>
      )
    }
  
    return (
      <div>
        näppäilyhistoria: {props.allClicks.join(' ')}
      </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = (props) => {
    const [clicks, setClicks] = useState({
        left: 0, right: 0
        })
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setClicks({...clicks, left: clicks.left + 1})
    }
        
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setClicks({...clicks, right: clicks.right + 1})
    }

    return (
      <div>
        <div>
          {clicks.left}
          <Button handleClick={handleLeftClick} text='vasen' />
          <Button handleClick={handleRightClick} text='oikea' />
          {clicks.right}
          <History allClicks={allClicks} />
        </div>
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))
