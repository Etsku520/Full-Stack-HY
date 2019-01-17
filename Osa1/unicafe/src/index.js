import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const Statistics = ({good, bad, neutral}) => {
    const total = good + neutral + bad

    if (total === 0) {
        return <p>vielä ei ole palautetta</p>
    }

    const average = (good - bad) / total
    const positive = good / total * 100

    return (
        <>
        <p>hyvä {good}</p>
        <p>neurtaali {neutral}</p>
        <p>huono {bad}</p>
        <p>yhteensä {total}</p>
        <p>keskiarvo {average}</p>
        <p>positiivista {positive} %</p>
        </>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Annappas palautetta</h1>
      <Button handleClick={addGood} text="hyvä"/>
      <Button handleClick={addNeutral} text="neutraali"/>
      <Button handleClick={addBad} text="huono"/>
      <h2>Statistiikat</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
