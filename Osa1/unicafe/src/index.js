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
        <Statistic text="hyvä" value={good} />
        <Statistic text="neutraali" value={neutral} />
        <Statistic text="huono" value={bad} />
        <Statistic text="yhteensä" value={total} />
        <Statistic text="keskiarvo" value={average} />
        <Statistic text="positiivista" value={positive} />
        </>
    )
}

const Statistic = ({text, value}) => <p>{text} {value}</p>

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
