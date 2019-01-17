import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const App = (props) => {
    const start = Math.floor(Math.random() * 6)
    const [selected, setSelected] = useState(start)
    const [votes, setVotes] = 
        useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

    const randomAnecdote = () => {
        const number = Math.floor(Math.random() * 6)
        console.log(number)
        setSelected(number)
    }

    const vote = () => {
        const copy = [...votes]
        copy[selected]++
        setVotes(copy)

    }

    return (
        <div>
            <p>{props.anecdotes[selected]} ({votes[selected]})</p>
            <Button handleClick={vote} text="vote"/>
            <Button handleClick={randomAnecdote} text="netx anecdote"/>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)