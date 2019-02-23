import React from 'react'
import { giveVoteTo } from './../reducers/anecdoteReducer'
import { eraseNotification, votedNotification} from './../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  
  const vote = (id) => {
    store.dispatch(
      giveVoteTo(id)
    )
    const content = anecdotes.find(a => a.id === id).content
    store.dispatch(votedNotification(content))
    setTimeout(() => {
      store.dispatch(eraseNotification())
    }, 5000)
  }

  return (
    anecdotes
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
      )
  )
}

export default AnecdoteList