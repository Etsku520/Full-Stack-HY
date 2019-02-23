import React from 'react';
import { createAnecdote, giveVoteTo } from './reducers/anecdoteReducer'

const App = (props) => {
  const store = props.store
  const anecdotes = props.store.getState()
  
  const vote = (id) => {
    store.dispatch(
      giveVoteTo(id)
    )
  }

  const anecdoteForm = () => {
    const newAnecdote = (event) => {
      event.preventDefault()
      store.dispatch(
        createAnecdote(event.target.anecdote.value)
      )
      event.target.anecdote.value = ''
    }
     return (
    <form onSubmit={newAnecdote}>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
     )
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      {anecdoteForm()}
    </div>
  )
}

export default App
